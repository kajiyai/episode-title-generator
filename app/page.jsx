"use client"

import { useState, useEffect } from "react";
import { Header, ResultCards, Features, Footer, CaptionCarousel, Testimonials } from "./components/index.js"
import { Box, VStack, Stack, Heading, IconButton, useColorMode, useColorModeValue, useClipboard, Container } from "@chakra-ui/react";


export default function Home() {
  // useStateを使う.APIの返り値
  const [mangaInput, setMangaInput] = useState("");
  const [result, setResult] = useState();
  const [img_url_1, setUrl1] = useState('画像を作ってね!');
  const [img_url_2, setUrl2] = useState('画像を作ってね!');
  const [img_url_3, setUrl3] = useState('画像を作ってね!');
  const [prompt1, setPrompt1] = useState('プロンプト生成ボタンを押した後に画像生成ボタンを押してね!!');
  const [prompt2, setPrompt2] = useState('プロンプト生成ボタンを押した後に画像生成ボタンを押してね!!');
  const [prompt3, setPrompt3] = useState('プロンプト生成ボタンを押した後に画像生成ボタンを押してね!!');


  // カラーモードを操作する.useColorModeというHooksを使用して表示するアイコンの切り替えも行う
  const { colorMode, toggleColorMode } = useColorMode("dark")

  // 呪文をコピーするボタンのためのHooks
  const { onCopy1, hasCopied1 } = useClipboard(prompt1);
  const { onCopy2, hasCopied2 } = useClipboard(prompt2);
  const { onCopy3, hasCopied3 } = useClipboard(prompt3);

  // タイトル生成ボタンを押した後
  async function generateTitle(event) {
    event.preventDefault();
    // let result = null;
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

  // 画像生成用のプロンプトを作成する
  const generatePrompt = (index) => async (event) => {
    event.preventDefault();
    try {
      if (index == 1) {
        const response = await fetch("/api/generatePrompt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // que:generateImage.jsの中の変数 プロンプトはres.firstを使用
          body: JSON.stringify({ title: res.first }),
        });
        const data = await response.json();
        if (response.status !== 200) {
          throw (
            data.error ||
            new Error(`Request failed with status ${response.status}`)
          );
        }
        setPrompt1(data.result);

      } else if (index == 2) {
        const response = await fetch("/api/generatePrompt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // que:generateImage.jsの中の変数 プロンプトはres.firstを使用
          body: JSON.stringify({ title: res.second }),
        });
        const data = await response.json();
        if (response.status !== 200) {
          throw (
            data.error ||
            new Error(`Request failed with status ${response.status}`)
          );
        }

        setPrompt2(data.result);
        return { prompt2: data.result }
      } else {
        const response = await fetch("/api/generatePrompt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // que:generateImage.jsの中の変数 プロンプトはres.firstを使用
          body: JSON.stringify({ title: res.third }),
        });
        const data = await response.json();
        if (response.status !== 200) {
          throw (
            data.error ||
            new Error(`Request failed with status ${response.status}`)
          );
        }
        setPrompt3(data.result);
        return { prompt3: data.result }
      }
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error("通信に失敗したよ", error);
      alert(error.message);
    }
  };

  // 画像生成ボタンを押した後
  const generateImage = (index) => async (event) => {
    event.preventDefault();
    try {
      if (index == 1) {
        const response = await fetch("/api/generateImage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // que:generateImage.jsの中の変数 プロンプトはres.firstを使用
          body: JSON.stringify({ que: prompt1 }),
        });
        const data = await response.json();
        if (response.status !== 200) {
          throw (
            data.error ||
            new Error(`Request failed with status ${response.status}`)
          );
        }

        setUrl1(data.result[0].url);
      } else if (index == 2) {
        const response = await fetch("/api/generateImage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // que:generateImage.jsの中の変数 プロンプトはres.firstを使用
          body: JSON.stringify({ que: prompt2 }),
        });
        const data = await response.json();
        if (response.status !== 200) {
          throw (
            data.error ||
            new Error(`Request failed with status ${response.status}`)
          );
        }
        setUrl2(data.result[0].url);
      } else {
        const response = await fetch("/api/generateImage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // que:generateImage.jsの中の変数 プロンプトはres.firstを使用
          body: JSON.stringify({ que: prompt3 }),
        });
        const data = await response.json();
        if (response.status !== 200) {
          throw (
            data.error ||
            new Error(`Request failed with status ${response.status}`)
          );
        }
        setUrl3(data.result[0].url);
      }
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error("通信に失敗したよ", error);
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
  tweet_text["first"] = ` 私が作ったエピソードタイトルは「${res.first}」です。`;
  tweet_text["second"] = ` 私が作ったエピソードタイトルは「${res.second}」です。`;
  tweet_text["third"] = ` 私が作ったエピソードタイトルは「${res.third}」です。`;


  let cards = [
    { gp: generatePrompt(1), gi: generateImage(1), p: prompt1, mt: res.first, url: img_url_1, tweet: tweet_text.first, que: mangaInput, oc: onCopy1, hc: hasCopied1 },
    { gp: generatePrompt(2), gi: generateImage(2), p: prompt2, mt: res.second, url: img_url_2, tweet: tweet_text.second, que: mangaInput, oc: onCopy2, hc: hasCopied2 },
    { gp: generatePrompt(3), gi: generateImage(3), p: prompt3, mt: res.third, url: img_url_3, tweet: tweet_text.third, que: mangaInput, oc: onCopy3, hc: hasCopied3 },
  ]

  useEffect(() => {
    fetch('/api/testdb')
      .then((res) => res.json());
  }, []);

  // コンストラクタDate
  const now = new Date();
  // 現在時刻を取得
  const str_now = now.getUTCFullYear()
    + '-' + ('0' + (now.getUTCMonth() + 1)).slice(-2)
    + '-' + ('0' + now.getUTCDate()).slice(-2)
    + 'T' + ('0' + now.getUTCHours()).slice(-2)
    + ':' + ('0' + now.getUTCMinutes()).slice(-2)
    + ':' + ('0' + now.getUTCSeconds()).slice(-2)
    + '.000Z';
  // 現在時刻の日付の00:00:00を取得
  const str_pre = now.getUTCFullYear()
    + '-' + ('0' + (now.getUTCMonth() + 1)).slice(-2)
    + '-' + ('0' + now.getUTCDate()).slice(-2)
    + 'T00:00:00.000Z'


  return (
    <>
      {/* headタグ内の設定 */}
      <Header></Header>
      {/* Features */}
      <Features gt={generateTitle} mi={mangaInput} smi={setMangaInput} cm={colorMode} tcm={toggleColorMode}></Features>
      {/* Carousel */}
      {/* <CaptionCarousel></CaptionCarousel> */}
      {/* Testimonials */}
      <Testimonials></Testimonials>
      {/* 結果を表示するエリア */}
      <Container maxW={'5xl'} py={12}>
        <VStack textAlign="center">
          <Heading as="h1" fontSize="4xl">
            出力結果
          </Heading>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            textAlign="center"
            justify="center"
            spacing={{ base: 4, lg: 10, }}
            py={16}>
            {cards.map((card, index) =>
              <ResultCards key={index} gp={card.gp} gi={card.gi} p={card.p} mt={card.mt} url={card.url} tweet={card.tweet} que={card.que} oc={card.oc} hc={card.hc}></ResultCards>
            )}
          </Stack>
        </VStack>
      </Container>
      <Footer></Footer>
    </>
  );
}
