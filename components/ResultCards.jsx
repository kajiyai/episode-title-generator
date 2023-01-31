import { ShareButton } from "./index.js"
import { TwitterShareButton, TwitterIcon } from "react-share";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Flex,
  VStack,
  HStack,
  StackDivider,
  useClipboard
} from '@chakra-ui/react';

export default function ResultCards(props) {
  return (

    <Box
      role={'group'}
      p={8}
      // 3つ並べるから、もしかしたらmarginは取るべきではない？？
      mb={8}
      minW={'330px'}
      // 画像生成後にどうにかなるのを要確認
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'lg'}
      pos={'relative'}
      zIndex={1}>
      <Stack pt={10} align={'center'}>
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${props.url})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={256}
            width={256}
            objectFit={'cover'}
            src={props.url}
            fallbackSrc='https://via.placeholder.com/256'
          />
        </Box>
        <Text py={4} color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
          {props.que}
        </Text>
        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
          {props.mt}
        </Heading>
        <VStack
          divider={<StackDivider borderColor='gray.20' />}
          spacing={4}
          align='center'
        >

          <form onSubmit={props.gp}>
            <Button
              colorScheme="blue"
              type="submit"
              value={props.mt}>
              呪文生成
            </Button>
          </form>

          <form onSubmit={props.gi}>
            <Button
              colorScheme="blue"
              type="submit"
              value={props.p}>
              画像生成
            </Button>
          </form>
          <Text>
            {props.p}
          </Text>
          {/* 
          <Button
            onClick={props.oc}
            value={props.p}
            colorScheme="blue"
          > 
            {props.hc ? "Copied!" : "Copy"}
          </Button>
          */}
          <TwitterShareButton
            url={"https://manga-title-generator-4vwn.vercel.app/"}
            title={props.tweet}
            hashtags={["openai", "mtg", "api"]}
          >
            <TwitterIcon size={40} round={true} />
          </TwitterShareButton>
        </VStack>
        {/* <ShareButton tweet={props.tweet}></ShareButton> */}
      </Stack>
    </Box>

  );
}