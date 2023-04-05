require("dotenv").config();
const express = require("express");
const app = express();

const { Configuration, OpenAIApi } = require("openai");
const bodyParser = require("body-parser");
const cors = require("cors");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/getBotResponse", async (req, res) => {
  const userInput = req.body.userInput;
  const context = `You are an AI chatbot that can answer questions related to immigration and community services in Sweden. `;
  const messages = [];
  messages.push({ role: "system", content: context });
  messages.push({ role: "user", content: userInput });
  console.log(messages);
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 150,
    });
    const botResponse = completion.data.choices[0].message.content;
    res.send(botResponse);
  } catch (error) {
    console.error(`Error with OpenAI API request: ${error.message}`);
    console.error(`Full error object:`, error); // Add this line for more detailed error logging
    res.status(500).send("Error with OpenAI API request");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
