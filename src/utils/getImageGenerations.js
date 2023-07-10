//open ai API
const { Configuration, OpenAIApi } = require("openai");

export async function getImageGenerations(prompt) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const response = await openai.createImage({
    prompt: prompt,
    n: 2,
    size: "1024x1024",
  });

  console.log(response);
}
