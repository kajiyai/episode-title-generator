import { Configuration, OpenAIApi } from "openai";
// DBの値を表示するAPI
import { Openai_log, Prisma, PrismaClient } from "@prisma/client";
import { IoAlarmOutline } from "react-icons/io5";
const prisma = new PrismaClient();
const now = new Date();

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
    // o_log_countが100以下なら
    if (o_log_count <= 100) {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: generatePrompt(manga),
        temperature: 0.8,
        max_tokens: 150,
      });
      res.status(200).json({ result: completion.data.choices[0].text });
      // 出力の確認
      // DBに値を格納
      const openai_log = await prisma.openai_log.create({
        data: {
          que: manga,
          text: completion.data.choices[0].text,
          type: 0,
          prompt_tokens: completion.data.usage.prompt_tokens,
          completion_tokens: completion.data.usage.completion_tokens,
          total_tokens: completion.data.usage.total_tokens,
          created_at: str_now,
        },
      });
    } else {
      // エラーの処理
      console.error();
      res.status(500).json({
        error: {
          message: "1日の使用上限に達しました",
        },
      });
    }
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
  return `次のキーワードを含んだ売れそうな漫画のタイトルを3つ生成して、次の形式のみ返してください
  {"first": ,"second": ,"third": }
   ${capitalizedManga}`;
}
