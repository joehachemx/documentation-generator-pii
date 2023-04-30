const { Configuration, OpenAIApi } = require("openai");
const vscode = require('vscode');

const config = vscode.workspace.getConfiguration('documentation-generator-pii');
const apiKey = config.get('apiKey');

const configuration = new Configuration({
  apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

async function runCompletion(prompt) {
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