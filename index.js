const { Configuration, OpenAIApi } = require("openai");
const TelegramBot = require('node-telegram-bot-api');

// Read OpenAI API key from environment variable
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Set up OpenAI API client
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Set up Telegram bot
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

// Handle incoming messages
bot.on('message', async (msg) => {
  // Only respond to text messages
  if (msg.text) {
    // Call OpenAI API to generate a response
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: msg.text}],
    });
    const response = completion.data.choices[0].text;

    // Send response back to user
    bot.sendMessage(msg.chat.id, response);
  }
});
