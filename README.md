# News Crawler

A Node.js application that periodically scrapes the latest news articles from BBC, summarizes them using an AI model, and stores the results in a MongoDB database. The process is automated to run every 8 hours.

## Features
- Scrapes top news articles from the BBC homepage
- Summarizes articles using the Groq AI model
- Stores article title, summary, image, and original URL in MongoDB
- Prevents duplicate summarization of the same article
- Runs automatically every 8 hours using a scheduler

## Project Structure
```
news-crawler/
├── src/
│   ├── ai_summerize/         # AI summarization logic
│   ├── db/                   # Database models and connection
│   ├── scheduler/            # Scheduling logic
│   ├── scraper/              # Web scraping logic
│   └── index.js              # Main entry point
├── package.json
└── README.md
```

## Setup
1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd news-crawler
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   Create a `.env` file in the root directory with the following variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   GROQ_API_KEY=your_groq_api_key
   ```

## Usage
To start the crawler and summarizer:
```bash
node src/index.js
```
- On startup, it will fetch and summarize the latest BBC news articles.
- It will then repeat this process automatically every 8 hours.

## Dependencies
- [axios](https://www.npmjs.com/package/axios) - HTTP requests
- [cheerio](https://www.npmjs.com/package/cheerio) - HTML parsing
- [dotenv](https://www.npmjs.com/package/dotenv) - Environment variable management
- [groq-sdk](https://www.npmjs.com/package/groq-sdk) - AI summarization
- [mongoose](https://www.npmjs.com/package/mongoose) - MongoDB ORM
- [node-cron](https://www.npmjs.com/package/node-cron) - Task scheduling

## Environment Variables
- `MONGODB_URI`: MongoDB connection string
- `GROQ_API_KEY`: API key for Groq AI summarization

## Example Article Document

Here's an example of how a news article is stored in MongoDB:

```json
{
  "_id": "68626ec5ec3819764ec27ab3",
  "title": "US must rule out more strikes before new talks, Iranian minister tells BBC",
  "summary": "The US must rule out further strikes on Iran if it wants to resume diplomatic talks, according to Iran's deputy foreign minister, Majid Takht-Ravanchi.
Iran is insisting on its right to enrich uranium for peaceful purposes, despite accusations that it is secretly developing a nuclear bomb.
The US and Iran were previously involved in talks over Iran's nuclear program, but hostilities escalated when Israel struck Iranian nuclear sites and the US bombed three of Iran's nuclear sites.
Iran's deputy foreign minister has stated that the US must provide clarity on its position regarding further attacks before talks can resume, and that Iran will continue to observe the current ceasefire with Israel as long as there are no further military attacks.",
  "image_url": "https://ichef.bbci.co.uk/news/1024/branded_news/e0de/live/3c326b50-552a-11f0-8485-7bd50fa63665.jpg",
  "original_article_url": "https://www.bbc.com/news/articles/c20r18x8x05o",
  "created_at": "2025-06-30T11:02:29.455Z",
  "__v": 0
}
```
