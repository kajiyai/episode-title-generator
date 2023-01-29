import { useState, useEffect } from "react";
import { Header, ResultCards, Features, Footer, CaptionCarousel, Testimonials } from "../components/index.js"
import { Box, VStack, Stack, Heading, IconButton, useColorMode, useColorModeValue, Container } from "@chakra-ui/react";


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
        console.log('index:', 1)
        console.log('a')
        const response = await fetch("/api/generatePrompt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // que:generateImage.jsの中の変数 プロンプトはres.firstを使用
          body: JSON.stringify({ title: res.first }),
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
        console.log("prompt1:", prompt1)
        console.log("dd")
        console.log("prompt1:", prompt1)
        setPrompt1(data.result);
        console.log("prompt1:", prompt1)

      } else if (index == 2) {
        console.log('index:', 2)
        console.log('a')
        const response = await fetch("/api/generatePrompt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // que:generateImage.jsの中の変数 プロンプトはres.firstを使用
          body: JSON.stringify({ title: res.second }),
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
        console.log("d")

        // console.log("response.data.data[0].url:", response.data.data[0].url);
        console.log("prompt2:", prompt2)
        console.log("dd")
        setPrompt2(data.result);
        console.log("prompt2:", prompt2)
        return { prompt2: data.result }
      } else {
        console.log('index:', 3)
        console.log('a')
        const response = await fetch("/api/generatePrompt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // que:generateImage.jsの中の変数 プロンプトはres.firstを使用
          body: JSON.stringify({ title: res.third }),
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
        console.log("d")

        // console.log("response.data.data[0].url:", response.data.data[0].url);
        console.log("prompt3:", prompt3)
        console.log("dd")
        setPrompt3(data.result);
        console.log("prompt3:", prompt3)
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
        console.log("prompt1:", prompt1)
        console.log('a')
        const response = await fetch("/api/generateImage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // que:generateImage.jsの中の変数 プロンプトはres.firstを使用
          body: JSON.stringify({ que: prompt1 }),
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
          body: JSON.stringify({ que: prompt2 }),
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
          body: JSON.stringify({ que: prompt3 }),
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

  console.log("res_b:", res)

  // 変数resにAPIの返り値resultを代入する
  if (result !== undefined) {
    const jsonString1 = '{"result":' + result.slice(result.indexOf("{")) + '}';
    const jsonString2 = result.slice(result.indexOf("{"));
    // 変数resの上書き
    res = JSON.parse(jsonString2);
  }

  console.log("res:", res)

  // 変数tweet_textをjson形式で定義
  let tweet_text = {};
  tweet_text["first"] = ` 私が作る漫画のタイトルは「${res.first}」です。`;
  tweet_text["second"] = ` 私が作る漫画のタイトルは「${res.second}」です。`;
  tweet_text["third"] = ` 私が作る漫画のタイトルは「${res.third}」です。`;


  console.log("a1:");
  // 生成した画像のurlを格納する変数を定義
  console.log("img_url_1", img_url_1);
  console.log("img_url_2", img_url_2);
  console.log("img_url_3", img_url_3);
  console.log("prompt1:", prompt1)
  console.log("prompt2:", prompt2)
  console.log("prompt3:", prompt3)
  console.log("a2:");
  console.log("result:", result);
  console.log("a3:");
  console.log("res:", res);
  console.log("a4:");

  let cards = [
    { gp: generatePrompt(1), gi: generateImage(1), p: prompt1, mt: res.first, url: img_url_1, tweet: tweet_text.first, que: mangaInput },
    { gp: generatePrompt(2), gi: generateImage(2), p: prompt2, mt: res.second, url: img_url_2, tweet: tweet_text.second, que: mangaInput },
    { gp: generatePrompt(3), gi: generateImage(3), p: prompt3, mt: res.third, url: img_url_3, tweet: tweet_text.third, que: mangaInput },
  ]


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
              <ResultCards key={index} gp={card.gp} gi={card.gi} p={card.p} mt={card.mt} url={card.url} tweet={card.tweet} que={card.que}></ResultCards>
            )}
          </Stack>
        </VStack>
      </Container>
      <Footer></Footer>
    </>
  );
}
