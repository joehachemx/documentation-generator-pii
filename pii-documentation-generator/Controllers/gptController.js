const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function runCompletion (prompt) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `
    Write me a small documentation about this code
    ###
    ${prompt}
    ###
    `,
    temperature: 0,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  })
  console.log(completion.data)
}

// runCompletion();

module.exports = { runCompletion };