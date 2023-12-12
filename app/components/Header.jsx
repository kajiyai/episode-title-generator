// Headタグを導入
import Head from "next/head";
const Header = () => {
    return (
        <Head >
            <title>エピタイ!!</title>
            <meta property="og:title" content="エピタイ!!" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://episode-title-generator.vercel.app/" />
            <meta property="og:image" content="https://episode-title-generator.vercel.app/img/tes2.png" />
            <meta property="og:site_name" content="epiti!!" />
            <meta property="og:description" content="漫画のエピソードタイトルや画像を作ることが出来るよ" />
            <meta name="twitter:card" content="summary_large_image" />
        </Head>
    )
}

export default Header;