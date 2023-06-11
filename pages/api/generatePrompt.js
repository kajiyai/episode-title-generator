import { Configuration, OpenAIApi } from "openai";
// DBの値を表示するAPI
import { Openai_log, Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const now = new Date();

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

  const title = req.body.title || "";
  if (title.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid title",
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
        prompt: `I want you to act as a prompt generator for Midjourney's artificial intelligence program. Your job is to provide detailed and creative descriptions that will inspire unique and interesting images from the AI. Keep in mind that the AI is capable of understanding a wide range of language and can interpret abstract concepts, so feel free to be as imaginative and descriptive as possible
      Tell me what a prompt you to generate unique and exciting Illustration of a cartoon covers in English. title:${title}
      this is example:"A field of wildflowers stretches out as far as the eye can see, each one a different color and shape. In the distance, a massive tree towers over the landscape, its branches reaching up to the sky like tentacles."
      
      please one passage.`,
        temperature: 0.8,
        max_tokens: 150,
      });
      res.status(200).json({ result: completion.data.choices[0].text });

      // DBに値を格納
      const openai_log = await prisma.openai_log.create({
        data: {
          que: title,
          text: completion.data.choices[0].text,
          type: 1,
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
