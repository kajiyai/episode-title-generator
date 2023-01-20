// Headタグを導入
import Head from "next/head";
const Header = () => {
    return (
        <Head >
            <title>Manga Title Generater</title>
            <meta property="og:title" content="Manga-Title-Generator" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://manga-title-generator.vercel.app/" />
            <meta property="og:image" content="../public/img/idea.jpg" />
            <meta property="og:site_name" content="Manga-Title-Generator" />
            <meta property="og:description" content="You can generate unique manga title!! This fits Twitter." />
            <meta name="twitter:card" content="summary_large_image" />
        </Head>
    )
}

export default Header;