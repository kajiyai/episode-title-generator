import { Configuration, OpenAIApi } from "openai";
import { Openai_log, Prisma, PrismaClient } from "@prisma/client";

// DBの接続
const prisma = new PrismaClient();
// 日付用
const now = new Date();

// 認証情報
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// 現在時刻を取得
const str_now =
  now.getUTCFullYear() +
  "-" +
  ("0" + (now.getUTCMonth() + 1)).slice(-2) +
  "-" +
  ("0" + now.getUTCDate()).slice(-2) +
  "T" +
  ("0" + now.getUTCHours()).slice(-2) +
  ":" +
  ("0" + now.getUTCMinutes()).slice(-2) +
  ":" +
  ("0" + now.getUTCSeconds()).slice(-2) +
  ".000Z";

// 現在の日付の00:00:00を取得
const str_pre =
  now.getUTCFullYear() +
  "-" +
  ("0" + (now.getUTCMonth() + 1)).slice(-2) +
  "-" +
  ("0" + now.getUTCDate()).slice(-2) +
  // " 00:00:00";
  "T00:00:00.000Z";

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
    // 0時--現在時刻までのレコードをカウント
    const o_log_count = await prisma.openai_log.count({
      where: {
        AND: {
          created_at: {
            lt: str_now,
          },
          created_at: {
            gt: str_pre,
          },
        },
      },
    });
    // レコードが100個よりも多い場合
    if (o_log_count <= 100) {
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

      // DBに値を格納
      const openai_log = await prisma.openai_log.create({
        data: {
          que: que,
          text: response.data.data.url,
          type: 2,
          prompt_tokens: 0,
          completion_tokens: 0,
          total_tokens: 0,
          created_at: str_now,
        },
      });
      console.log(openai_log);
    }
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
