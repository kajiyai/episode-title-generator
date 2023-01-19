import Head from "next/head";
import { useState } from "react";
import { Ogp } from "../components/index.js"
import { TwitterShareButton, FacebookShareButton, LineShareButton, HatenaShareButton, TwitterIcon, FacebookIcon, LineIcon, HatenaIcon } from "react-share";
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
  Badge
} from "@chakra-ui/react";


export default function Home() {
  const [mangaInput, setMangaInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
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
  const tweet_text = `私の漫画のタイトルは${result} です。`;

  // Stateの管理
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    console.log({ name, password });
    setName("");
    setPassword("");
  };

  return (
    <div>
      {/* <ogp /> */}
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
      {/*
      <VStack>
        <VStack w="30vw">
          <FormLabel htmlFor="name">First name</FormLabel>
          <Input
            id="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button mt={4} colorScheme="teal" onClick={handleClick}>
            Submit
          </Button>

          <TwitterShareButton
            url={"https://manga-title-generator.vercel.app/"}
            title={tweet_text}
            hashtags={["openai", "mtg", "クソアプリ"]}
          >
            <TwitterIcon size={30} round={true} />
          </TwitterShareButton>
        </VStack>
      </VStack> */}

      <Flex height="100vh" align="center" justify="center">

        <Flex direction="column" background="gray.100" p={12} rounded={6}>

          <Center bg='gray.200' w='100%' p={8} color='white' rounded={6} mb={6}>
            <Image src="/img/idea.jpg" borderRadius="full" boxSize="200px" alt="picture of title generator" />
          </Center>

          <Heading mb={8}>Manga Title Generater</Heading>
          <form onSubmit={onSubmit}>
            <Input
              type="text"
              name="manga"
              placeholder="キーワードを入力　(例)海賊"
              value={mangaInput}
              variant="filled"
              onChange={(e) => setMangaInput(e.target.value)}
              mb={6}
              background="white"
            />
            <Input type="submit" mb={6} background="pink" value="タイトルを生成" />
          </form>

          <Center bg='navy' w='100%' p={4} color='white' rounded={6}>
            <Text fontSize="3xl">{result}</Text>
          </Center>

          <div>
            {/* <FacebookShareButton url="https://manga-title-generator.vercel.app/" quote="Manga-Title-Generator">
            <FacebookIcon size={30} round={true} />
          </FacebookShareButton>

          <LineShareButton url="https://manga-title-generator.vercel.app/" title="Manga-Title-Generator">
            <LineIcon size={30} round={true} />
          </LineShareButton>

          <HatenaShareButton url="https://manga-title-generator.vercel.app/" title="Manga-Title-Generator">
            <HatenaIcon size={30} round={true} />
          </HatenaShareButton> */}
          </div>
        </Flex>

      </Flex>
    </div>
  );
}
