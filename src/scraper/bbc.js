const axios = require('axios');
const cheerio = require('cheerio');

const BBC_HOMEPAGE = 'https://www.bbc.com';

async function fetchBBCArticles() {
  try {
    const { data: homepageHtml } = await axios.get(BBC_HOMEPAGE);
    const $ = cheerio.load(homepageHtml);
    const articleLinks = new Set();

    // Find top news article links (BBC uses 'a' tags with hrefs containing '/news/' and not just section pages)
    $('a[href^="/news/"]').each((_, el) => {
      const href = $(el).attr('href');
      if (href && !href.endsWith('/news/') && !href.includes('#')) {
        articleLinks.add(BBC_HOMEPAGE + href.split('?')[0]);
      }
    });

    const topLinks = Array.from(articleLinks).slice(0, 10);
    const articles = [];

    for (const url of topLinks) {
      try {
        const { data: articleHtml } = await axios.get(url);
        const $$ = cheerio.load(articleHtml);
        const title = $$('h1').first().text().trim();
        let content = '';
        // BBC article paragraphs
        $$("article p").each((_, p) => {
          const text = $$(p).text().trim();
          if (text.length > 40) content += text + '\n';
        });
        // Fallback if no article tag
        if (!content) {
          $$("p").each((_, p) => {
            const text = $$(p).text().trim();
            if (text.length > 40) content += text + '\n';
          });
        }
        // Featured image
        let image_url = $$('meta[property="og:image"]').attr('content') || '';
        if (!image_url) {
          image_url = $$('img').first().attr('src') || '';
        }
        if (title && content) {
          articles.push({ title, content, image_url, url });
        }
      } catch (err) {
        console.error('Failed to fetch or parse article:', url, err.message);
      }
    }
    return articles;
  } catch (err) {
    console.error('Failed to fetch BBC homepage:', err.message);
    return [];
  }
}

module.exports = fetchBBCArticles; 