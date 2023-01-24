import Head from "next/head";
import { useState } from "react";
import { Header, ShareButton, ResultCards, Features, Footer } from "../components/index.js"
import { Box, VStack, Container, Wrap, WrapItem, Grid, Flex, Stack, HStack, Heading, Input, useColorMode, useColorModeValue, Center, Image, Button } from "@chakra-ui/react";


export default function Home() {
  // useStateを使う.APIの返り値
  const [mangaInput, setMangaInput] = useState("");
  const [result, setResult] = useState();
  const [img_url_1, setUrl1] = useState('画像を作ってね!');
  const [img_url_2, setUrl2] = useState('画像を作ってね!');
  const [img_url_3, setUrl3] = useState('画像を作ってね!');

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

  // // img_urlの定義
  // let img_url_1 = "画像を作ってね!";
  // let img_url_2 = "画像を作ってね!";
  // let img_url_3 = "画像を作ってね!";

  // 画像生成ボタンを押した後
  const generateImage = (index) => async (event) => {
    event.preventDefault();
    try {
      if (index == 1) {
        console.log('index:', 1)
        console.log('a')
        const response = await fetch("/api/generateImage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // que:generateImage.jsの中の変数 プロンプトはres.firstを使用
          body: JSON.stringify({ que: res.first }),
        });
        console.log("response:", response)
        console.log('b')
        const data = await response.json();
        console.log('c')
        if (response.status !== 200) {
          throw (
            data.error ||
            new Error(`Request failed with status ${response.status}`)
          );
        }
        console.log("response.status", response.status)
        // console.log("response", response);
        console.log("data", data);
        console.log("data.result[0].url", data.result[0].url);
        console.log("d")

        // console.log("response.data.data[0].url:", response.data.data[0].url);
        console.log("img_url1:", img_url_1)
        console.log("dd")
        setUrl1(data.result[0].url);
        console.log("img_url1:", img_url_1)
      } else if (index == 2) {
        console.log('index:', 2)
        console.log('a')
        const response = await fetch("/api/generateImage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // que:generateImage.jsの中の変数 プロンプトはres.firstを使用
          body: JSON.stringify({ que: res.second }),
        });
        console.log("response:", response)
        console.log('b')
        const data = await response.json();
        console.log('c')
        if (response.status !== 200) {
          throw (
            data.error ||
            new Error(`Request failed with status ${response.status}`)
          );
        }
        console.log("response.status", response.status)
        // console.log("response", response);
        console.log("data", data);
        console.log("data.result[0].url", data.result[0].url);
        console.log("d")

        // console.log("response.data.data[0].url:", response.data.data[0].url);
        console.log("img_url_2:", img_url_2)
        console.log("dd")
        setUrl2(data.result[0].url);
        console.log("img_url_2:", img_url_2)
      } else {
        console.log('index:', 3)
        console.log('a')
        const response = await fetch("/api/generateImage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // que:generateImage.jsの中の変数 プロンプトはres.firstを使用
          body: JSON.stringify({ que: res.third }),
        });
        console.log("response:", response)
        console.log('b')
        const data = await response.json();
        console.log('c')
        if (response.status !== 200) {
          throw (
            data.error ||
            new Error(`Request failed with status ${response.status}`)
          );
        }
        console.log("response.status", response.status)
        // console.log("response", response);
        console.log("data", data);
        console.log("data.result[0].url", data.result[0].url);
        console.log("d")

        // console.log("response.data.data[0].url:", response.data.data[0].url);
        console.log("img_url_3:", img_url_3)
        console.log("dd")
        setUrl3(data.result[0].url);
        console.log("img_url_3:", img_url_3)
      };


      // console.log("response:", response)
      // console.log('b')
      // const data = await response.json();
      // console.log('c')
      // if (response.status !== 200) {
      //   throw (
      //     data.error ||
      //     new Error(`Request failed with status ${response.status}`)
      //   );
      // }
      // console.log("response.status", response.status)
      // // console.log("response", response);
      // console.log("data", data);
      // console.log("data.result[0].url", data.result[0].url);
      // console.log("d")

      // // console.log("response.data.data[0].url:", response.data.data[0].url);
      // console.log("img_url:", img_url)
      // console.log("dd")
      // setUrl(data.result[0].url);

    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error("通信に失敗したよ", error);
      alert(error.message);
    }
  }


  //img_urlの呼び出し
  // (async () => {
  //   console.log("img_url", img_url);
  // })();


  // 変数resをjson形式で定義
  let res = {};
  res["first"] = "";
  res["second"] = "";
  res["third"] = "";

  console.log("res_b:", res)

  // 変数resにAPIの返り値resultを代入する
  if (result !== undefined) {
    const jsonString1 = '{"result":' + result.slice(result.indexOf("{")) + '}';
    const jsonString2 = result.slice(result.indexOf("{"));
    // 変数resの上書き
    res = JSON.parse(jsonString2);
  }

  console.log("res_a:", res)

  // 変数tweet_textをjson形式で定義
  let tweet_text = {};
  tweet_text["first"] = `私が作る漫画のタイトルは「${res.first}」です。`;
  tweet_text["second"] = `私が作る漫画のタイトルは「${res.second}」です。`;
  tweet_text["third"] = `私が作る漫画のタイトルは「${res.third}」です。`;


  console.log("a1:");
  // 生成した画像のurlを格納する変数を定義
  console.log("img_url_1", img_url_1);
  console.log("img_url_2", img_url_2);
  console.log("img_url_3", img_url_3);
  console.log("a2:");
  console.log(result);
  console.log("a3:");
  console.log(res);
  console.log("a4:");

  let cards = [
    { gi: generateImage(1), mt: res.first, url: img_url_1, tweet: tweet_text.first, que: mangaInput },
    { gi: generateImage(2), mt: res.second, url: img_url_2, tweet: tweet_text.second, que: mangaInput },
    { gi: generateImage(3), mt: res.third, url: img_url_3, tweet: tweet_text.third, que: mangaInput }
  ]


  return (
    <>
      {/* headタグ内の設定 */}
      <Header></Header>
      {/* Features */}
      <Features gt={generateTitle} mi={mangaInput} smi={setMangaInput}></Features>
      {/* <p>画像のurl:{img_url}</p> */}
      {/* 結果を表示するエリア */}
      <Box py={12}>
        <VStack textAlign="center">
          <Heading as="h1" fontSize="4xl">
            出力結果
          </Heading>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            textAlign="center"
            justify="center"
            spacing={{ base: 4, lg: 10 }}
            py={10}>
            {cards.map((card, index) =>
              <ResultCards key={index} gi={card.gi} mt={card.mt} url={card.url} tweet={card.tweet} que={card.que}></ResultCards>
            )}
          </Stack>
        </VStack>
      </Box>
      <Footer></Footer>
    </>
  );
}
