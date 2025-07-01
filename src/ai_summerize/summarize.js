const Groq = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const MODEL = "compound-beta";

async function summarizeArticle(title, content) {
  try {
    const prompt = `Summarize the following news article in 3-4 sentences.\nTitle: ${title}\nContent: ${content}`;
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant that summarizes news articles." },
        { role: "user", content: prompt },
      ],
      model: MODEL,
      max_tokens: 300,
      temperature: 0.5,
    });
    return chatCompletion.choices[0]?.message?.content?.trim() || null;
  } catch (err) {
    console.error("Groq summarization failed:", err.message);
    return null;
  }
}

module.exports = summarizeArticle; 