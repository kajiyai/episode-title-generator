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

  const que = req.body.que || "";
  if (que.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid query",
      },
    });
    return;
  }

  try {
    console.log("a");
    // 画像の生成
    const response = await openai.createImage({
      prompt: que,
      n: 1,
      size: "256x256",
    });
    // API通信用
    // const response = "dummy text";
    console.log("b");
    console.log("que:", que);
    console.log("response.data:", response.data);
    console.log("c");
    // index.jsxへ返す内容
    res.status(200).json({ result: response.data.data });
    console.log("d");
  } catch (error) {
    if (error.response) {
      console.log("e");
      console.log(error.response.status);
      console.log("f");
      console.log(error.response.data);
      console.log("g");
    } else {
      console.log(error.message);
      console.log("h");
    }
  }
}
