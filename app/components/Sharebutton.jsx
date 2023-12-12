import { ButtonGroup } from "@chakra-ui/react";
import { TwitterShareButton, FacebookShareButton, LineShareButton, HatenaShareButton, TwitterIcon, FacebookIcon, LineIcon, HatenaIcon } from "react-share";
const ShareButton = (props) => {
    return (
        <>
            <ButtonGroup>
                <TwitterShareButton
                    url={"https://manga-title-generator.vercel.app/"}
                    title={props.tweet}
                    hashtags={["openai", "mtg", "クソアプリ"]}
                >
                    <TwitterIcon size={20} round={true} />
                </TwitterShareButton>
                <FacebookShareButton url="https://manga-title-generator.vercel.app/" quote="Manga-Title-Generator">
                    <FacebookIcon size={20} round={true} />
                </FacebookShareButton>

                <LineShareButton url="https://manga-title-generator.vercel.app/" title="Manga-Title-Generator">
                    <LineIcon size={20} round={true} />
                </LineShareButton>

                <HatenaShareButton url="https://manga-title-generator.vercel.app/" title="Manga-Title-Generator">
                    <HatenaIcon size={20} round={true} />
                </HatenaShareButton>
            </ButtonGroup>
        </>
    )
}

export default ShareButton;