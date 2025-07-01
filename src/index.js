const connectDB = require('./db/connection');
const Article = require('./db/Article');
const fetchBBCArticles = require('./scraper/bbc');
const summarizeArticle = require('./ai_summerize/summarize');
const scheduleEvery8Hours = require('./scheduler/schedule');

async function processBBCNews() {
  try {
    console.log(`[${new Date().toISOString()}] Fetching BBC news...`);
    const articles = await fetchBBCArticles();
    for (const { title, content, image_url, url } of articles) {
      // Check if already summarized
      const exists = await Article.findOne({ original_article_url: url });
      if (exists) continue;
      const summary = await summarizeArticle(title, content);
      if (summary) {
        await Article.create({
          title,
          summary,
          image_url,
          original_article_url: url,
        });
        console.log(`\n📰 ${title}\n${url}\n🔎 Summary: ${summary}\n`);
      }
    }
  } catch (err) {
    console.error('Error in processBBCNews:', err.message);
  }
}

(async () => {
  await connectDB();
  // Run once on startup
  await processBBCNews();
  // Schedule every 8 hours
  scheduleEvery8Hours(processBBCNews);
})(); 