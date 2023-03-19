const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function runCompletion () {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `
    Hello, how are you?
    ###
    `,
    temperature: 0,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ["\n"],
  })
  console.log(completion.data.choices[0].text)
  
}

// runCompletion();

module.exports = { runCompletion };