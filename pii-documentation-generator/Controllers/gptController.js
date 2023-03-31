const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config()

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

async function runCompletion (prompt) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `
    Write an extremely brief documentation about this code without basic explanation. Expect the reader to be an experienced coder. If my code contains a function, do not give me its name.
    ###
    ${prompt}
    ###
    `,
    temperature: 0,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    max_tokens: 1000,
  })

  
  return completion.data.choices[0].text
}


module.exports = { runCompletion };

/* TODO
- clean code
- fix .env and api key
- penser comment realiser cette feature considerant c paid (chacun met son propre token??)
*/