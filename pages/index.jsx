import Head from "next/head";
import Image from 'next/image'
import { useState } from "react";
import styles from "../styles/index.module.css";
import { Ogp } from "../components/index.js"
import { TwitterShareButton, FacebookShareButton, LineShareButton, HatenaShareButton, TwitterIcon, FacebookIcon, LineIcon, HatenaIcon } from "react-share";

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

  return (
    <div>
      {/* <ogp /> */}
      <Head >
        <title>OpenAI Quickstart</title>
        <meta property="og:title" content="Manga-Title-Generator" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="example.com" />
        <meta property="og:image" content="../public/img/idea.jpg" />
        <meta property="og:site_name" content="Manga-Title-Generator" />
        <meta property="og:description" content="You can generate unique manga title!! This fits Twitter." />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className={styles.main}>
        <Image src="/img/idea.jpg" width={500} height={500} objectFit="contain" vclassName={styles.icon} />
        <h3>Manga Title Generater</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="manga"
            placeholder="キーワードを入力"
            value={mangaInput}
            onChange={(e) => setMangaInput(e.target.value)}
          />
          <input type="submit" value="タイトルを生成" />
        </form>
        <div className={styles.result}>{result}</div>
        <div>
          <TwitterShareButton
            url={"https://example.com"}
            title={tweet_text}
            hashtags={["openai", "mtg", "クソアプリ"]}
          >
            <TwitterIcon size={30} round={true} />
          </TwitterShareButton>

          {/* <FacebookShareButton url="https://example.com" quote="Manga-Title-Generator">
            <FacebookIcon size={30} round={true} />
          </FacebookShareButton>

          <LineShareButton url="https://example.com" title="Manga-Title-Generator">
            <LineIcon size={30} round={true} />
          </LineShareButton>

          <HatenaShareButton url="https://example.com" title="Manga-Title-Generator">
            <HatenaIcon size={30} round={true} />
          </HatenaShareButton> */}
        </div>
      </main>
    </div>
  );
}
