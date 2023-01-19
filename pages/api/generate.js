import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(manga),
      temperature: 0.8,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
    // 出力の確認
    // console.log("abc:", completion.data.choices[0].text);
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(manga) {
  const capitalizedManga =
    manga[0].toUpperCase() + manga.slice(1).toLowerCase();
  return `
  鍵括弧なしで出力して
  次のキーワードを入れておもしろい漫画のタイトルを生成してください
   ${capitalizedManga}`;
}
