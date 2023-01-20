import { Configuration, OpenAIApi } from "openai";

// 認証情報
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// APIによるデータの受け渡し
export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const manga = req.body.manga || "";
  if (manga.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid manga",
      },
    });
    return;
  }

  try {
    const response = await openai.createImage({
      prompt: "a white siamese cat",
      n: 1,
      size: "256x256",
    });
    console.log(response.data.data[0].url);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}
