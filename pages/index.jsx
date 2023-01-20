import Head from "next/head";
import { useState } from "react";
import { Header, ShareButton, ResultCards } from "../components/index.js"
import { Flex, Heading, Input, useColorMode, useColorModeValue, Center, Image } from "@chakra-ui/react";


export default function Home() {
  // useStateを使う.APIの返り値
  const [mangaInput, setMangaInput] = useState("");
  const [result, setResult] = useState();

  // タイトル生成ボタンを押した後
  async function generateTitle(event) {
    event.preventDefault();
    let result = null;
    try {
      const response = await fetch("/api/generateText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ manga: mangaInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      setResult(data.result);
      setMangaInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }


  // 変数resをjson形式で定義
  let res = {};
  res["first"] = "";
  res["second"] = "";
  res["third"] = "";

  // 変数resにAPIの返り値resultを代入する
  if (result !== undefined) {
    const jsonString1 = '{"result":' + result.slice(result.indexOf("{")) + '}';
    const jsonString2 = result.slice(result.indexOf("{"));
    // 変数resの上書き
    res = JSON.parse(jsonString2);
  }

  // 変数tweet_textをjson形式で定義
  let tweet_text = {};
  tweet_text["first"] = `私が作る漫画のタイトルは「${res.first}」です。`;
  tweet_text["second"] = `私が作る漫画のタイトルは「${res.second}」です。`;
  tweet_text["third"] = `私が作る漫画のタイトルは「${res.third}」です。`;


  return (
    <>
      {/* headタグ内の設定 */}
      <Header></Header>
      {/* トップページ.タイトルと入力画面 */}
      <Flex height="90vh" align="center" justify="center" background="white">
        <Flex direction="column" background="gray.100" p={12} rounded={6} mb={3} color="black">
          <Center bg='gray.200' w='100%' p={8} rounded={6} mb={6}>
            <Image src="/img/top.jpg" borderRadius="full" boxSize="200px" alt="picture of title generator" />
          </Center>
          <Heading mb={8}>Manga Title Generater</Heading>
          <form onSubmit={generateTitle}>
            <Input
              type="text"
              name="manga"
              placeholder="キーワードを入力"
              value={mangaInput}
              variant="filled"
              onChange={(e) => setMangaInput(e.target.value)}
              mb={6}
              // プレースホルダーが見えない！後々に要確認！！
              background="gray.50"
            />
            <Input type="submit" mb={6} background="pink" value="タイトルを生成" color="white" />
          </form>
        </Flex>
      </Flex >
      {/* 結果を表示するエリア */}
      <Flex height="60vh" align="center" justify="space-around" direction="row" background="gray.50" p={8} m={8}>
        <ResultCards MT={res.first} tweet={tweet_text.first}></ResultCards>
        <ResultCards MT={res.second} tweet={tweet_text.second}></ResultCards>
        <ResultCards MT={res.third} tweet={tweet_text.third}></ResultCards>
      </Flex>
    </>
  );
}
