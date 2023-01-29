// Headタグを導入
import Head from "next/head";
const Header = () => {
    return (
        <Head >
            <title>エピタイ!!</title>
            <meta property="og:title" content="エピタイ!!" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://manga-title-generator.vercel.app/" />
            <meta property="og:image" content="/img/ai1.jpg" />
            <meta property="og:site_name" content="epiti!!" />
            <meta property="og:description" content="You can make episode title and suited image for your manga or comic." />
            <meta name="twitter:card" content="summary_large_image" />
        </Head>
    )
}

export default Header;