import Head from "next/head";
import { useState } from "react";
import { Ogp, ShareButton, ResultCards } from "../components/index.js"
import {
  Button,
  Flex,
  flexbox,
  Heading,
  Input,
  useColorMode,
  useColorModeValue,
  Center,
  Image,
  Wrap,
  WrapItem,
  VStack,
  FormLabel,
  password,
  handleClick,
  Box,
  Kbd,
  Spinner,
  Text,
  Spacer,
  Badge,
  Card, CardHeader, CardBody, CardFooter
} from "@chakra-ui/react";

// テキスト形式のjsonをクリーンアップしてjson形式に変更する関数
const MakeJson = ({ str }) => {
  const [jsonData, setJsonData] = useState({});
  if (str !== undefined) {
    const jsonString = str.slice(str.indexOf("{"));
    try {
      const res = JSON.parse(jsonString);
      setJsonData(res);
    } catch (e) {
      console.error("Invalid JSON format");
    }
  }
  return jsonData;
}


export default function Home() {
  const [mangaInput, setMangaInput] = useState("");
  const [result, setResult] = useState();

  // タイトル生成ボタンを押した後
  async function onSubmit(event) {
    event.preventDefault();
    let result = null;
    try {
      const response = await fetch("/api/generate", {
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

  // strings for twitter
  const tweet_text = `私が作る漫画のタイトルは${result} です。`;
  // const tweet_text1 = `私が作る漫画のタイトルは${result.first} です。`;
  // const tweet_text2 = `私が作る漫画のタイトルは${result.second} です。`;
  // const tweet_text3 = `私が作る漫画のタイトルは${result.third} です。`;

  console.log("result:", result)


  // str2json2strを試みる
  if (result !== undefined) {
    const jsonString1 = '{"result":' + result.slice(result.indexOf("{")) + '}';
    const jsonString2 = result.slice(result.indexOf("{"));
    const res = JSON.parse(jsonString2);
    console.log("jsonString1:", jsonString1)
    console.log("jsonString2:", jsonString2)
    console.log("res:", res)
  }



  return (
    <>
      <Head >
        <title>OpenAI Quickstart</title>
        <meta property="og:title" content="Manga-Title-Generator" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://manga-title-generator.vercel.app/" />
        <meta property="og:image" content="../public/img/idea.jpg" />
        <meta property="og:site_name" content="Manga-Title-Generator" />
        <meta property="og:description" content="You can generate unique manga title!! This fits Twitter." />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Flex height="90vh" align="center" justify="center" background="white">
        <Flex direction="column" background="gray.100" p={12} rounded={6} mb={3} color="black">

          <Center bg='gray.200' w='100%' p={8} rounded={6} mb={6}>
            <Image src="/img/top.jpg" borderRadius="full" boxSize="200px" alt="picture of title generator" />
          </Center>

          <Heading mb={8}>Manga Title Generater</Heading>
          <form onSubmit={onSubmit}>
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

        <ResultCards result={result} tweet={tweet_text}></ResultCards>
        <ResultCards result={result} tweet={tweet_text}></ResultCards>
        <ResultCards result={result} tweet={tweet_text}></ResultCards>
      </Flex>
    </>
  );
}
