const axios = require('axios');
const cheerio = require('cheerio');

const sources = [
//   {
//     name: 'NDTV',
//     homepage: 'https://www.ndtv.com',
//     articleSelector: 'a[href^="https://www.ndtv.com/"]',
//     contentSelector: 'p',
//     tags:[
//         "cricket",
//         "world-news"
//     ]
//   },
//   {
//     name: 'TOI',
//     homepage: 'https://timesofindia.indiatimes.com',
//     articleSelector: 'a[href^="/"]',
//     contentSelector: '._s30J.clearfix p',
//     prefix: 'https://timesofindia.indiatimes.com',
//   },
//   {
//     name: 'India Today',
//     homepage: 'https://www.indiatoday.in',
//     articleSelector: 'a[href^="/"]',
//     contentSelector: 'p',
//     prefix: 'https://www.indiatoday.in',
//   },
  {
    name: 'The Hindu',
    homepage: 'https://www.thehindu.com',
    articleSelector: 'a[href^="/news/"]',
    contentSelector: 'article p',
    prefix: 'https://www.thehindu.com',
  },
];

async function getArticleLinks(source) {
  try {
    const { data } = await axios.get(source.homepage);
    const $ = cheerio.load(data);

    const links = new Set();

    $(source.articleSelector).each((_, el) => {
      let href = $(el).attr('href');
      if (!href || href.includes('#')) return;

      // Normalize relative URLs
      if (!href.startsWith('http')) {
        href = source.prefix ? `${source.prefix}${href}` : `${source.homepage}${href}`;
      }

      // ✅ Only keep URLs that include one of the valid tags
    //   const hasValidTag = source.tags?.some(tag => href.includes(`/${tag}/`));
    //   if (!hasValidTag) return;
      const pathname = new URL(href).pathname;
if (pathname.split('/').filter(Boolean).length <= 1) return;
      links.add(href.split('?')[0]); // remove query params
    });

    return Array.from(links).slice(0, 10); // limit for demo
  } catch (err) {
    console.error(`[${source.name}] Failed to fetch links:`, err.message);
    return [];
  }
}


async function extractArticle(source, url) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (NewsBot 1.0)',
      },
    });

    const $ = cheerio.load(data);
    const title = $('h1').first().text().trim();
    const paragraphs = [];

    $(source.contentSelector).each((_, el) => {
      const text = $(el).text().trim();
      if (text.length > 40) paragraphs.push(text);
    });

    return {
      title,
      url,
      content: paragraphs.join('\n\n'),
    };
  } catch (err) {
    console.error(`[${source.name}] Failed to extract article: ${url}`, err.message);
    return null;
  }
}

(async () => {
  for (const source of sources) {
    console.log(`\n🌐 Fetching from ${source.name}...`);

    const links = await getArticleLinks(source);

    for (const url of links) {
      const article = await extractArticle(source, url);
      if (article) {
        console.log(`\n📰 ${article.title}`);
        console.log(`${article.url}`);
        console.log(article.content.slice(0, 300) + '...\n'); // Preview only
      }
    }
  }
})();
