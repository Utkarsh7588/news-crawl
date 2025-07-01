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

## License
ISC 