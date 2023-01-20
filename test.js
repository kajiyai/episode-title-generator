const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

// 認証情報
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
(async () => {
  const response = await openai.createImage({
    prompt: "a white siamese cat",
    n: 1,
    size: "256x256",
  });
  console.log(response.data.data[0].url);
})();
