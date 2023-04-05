const { Configuration, OpenAIApi } = require("openai");
const bodyParser = require("body-parser");
const cors = require("cors");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const handler = async (event, context, callback) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const userInput = JSON.parse(event.body).userInput;
  const context = `You are an AI chatbot that can answer questions related to immigration and community services in Sweden. `;
  const messages = [];
  messages.push({ role: "system", content: context });
  messages.push({ role: "user", content: userInput });

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 150,
    });
    const botResponse = completion.data.choices[0].message.content;
    return {
      statusCode: 200,
      body: botResponse,
    };
  } catch (error) {
    console.error(`Error with OpenAI API request: ${error.message}`);
    console.error(`Full error object:`, error);
    return {
      statusCode: 500,
      body: "Error with OpenAI API request",
    };
  }
};

module.exports = { handler };
