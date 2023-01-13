// Headタグを導入
import Head from "next/head";
const Ogp = () => {
    return (
        <Head>
            <title>ページのタイトル</title>
            <meta property="og:title" content="Manga-Title-Generator" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="" />
            <meta property="og:image" content="" />
            <meta property="og:site_name" content="Manga-Title-Generator" />
            <meta property="og:description" content="You can generate unique manga title!! This fits Twitter." />
            <meta name="twitter:card" content="summary_large_image" />
        </Head>
    )
}

export default Ogp;