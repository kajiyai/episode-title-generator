// DBの値を表示するAPI
import { Openai_log, Prisma, PrismaClient } from "@prisma/client";
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

// Data型にしてみたが、文字列のまま比較可能だった。
// const dt_now = Date.parse(str_now);
// const dt_pre = Date.parse(str_pre);
// console.log(dt_now);
// console.log(dt_pre);

console.log("str_now:", typeof str_now);
console.log("str_pre:", typeof str_pre);
console.log("dt_now:", typeof dt_now);
console.log("dt_pre:", typeof dt_pre);
console.log("str_now:", str_now);
console.log("str_pre:", str_pre);

export default async function handler(req, res) {
  /* openaiのレコードのカウントを取得 */
  console.log("a");
  const o_log_count = await prisma.openai_log.count({
    // 0時--現在時刻までのレコードをカウント
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

  console.log(o_log_count);
  // o_log_countが100なら
  if (o_log_count <= 100) {
    console.log(o_log_count);
    console.log("b");
    res.status(200).json(o_log_count);
  }
  console.log("c");
}

// DBに値を保存するAPI

// import { Openai } from "@prisma/client";
// import { NextApiRequest, NextApiResponse } from "next";

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   const { method } = req;

//   switch (method) {
//     case "GET":
//       const authors = await prisma.author.findMany();
//       res.status(200).json(authors);
//       break;

//     case "POST":
//       const author = await prisma.author.create({
//         data: {
//           name: "King nob",
//         },
//       });
//       res.status(200).json(author); // idを含む保存したデータを返す
//       break;

//     default:
//       res.setHeader("Allow", ["GET", "POST"]);
//       res.status(405).end(`Method ${method} Not Allowed`);
//   }
// }
