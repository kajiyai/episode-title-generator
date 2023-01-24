// import { Text, Image, Card, CardHeader, CardBody, CardFooter, Button } from "@chakra-ui/react";
import { ShareButton } from "./index.js"

// const ResultCards = (props) => {
//   return (
//     <>
//       <Card maxW='md' p={6}>
//         <CardBody>
//           <Text fontSize="md">{props.MT}</Text>
//           <Image
//             objectFit='cover'
//             src={props.url}
//             alt='画像を作ってね！'
//           />
//           <form onSubmit={props.GI}>
//             <Button
//               colorScheme="blue"
//               type="submit"
//               value={props.MT}>
//               画像生成
//             </Button>
//           </form>
//         </CardBody>
//         <CardFooter
//           flexWrap='wrap'
//           alignItems="center"
//         >
//           <ShareButton tweet={props.tweet}></ShareButton>
//         </CardFooter>
//       </Card>
//     </>
//   )
// }

// export default ResultCards;

import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button
} from '@chakra-ui/react';

export default function ResultCards(props) {
  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
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
            height={230}
            width={282}
            objectFit={'cover'}
            src={props.url}
            alt="画像を作ってね！"
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            {props.que}
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {props.mt}
          </Heading>
          <Stack direction={'row'} align={'center'}>
            <form onSubmit={props.gi}>
              <Button
                colorScheme="blue"
                type="submit"
                value={props.mt}>
                画像生成
              </Button>
            </form>
            {/* <Text fontWeight={800} fontSize={'xl'}>
              $57
            </Text>
            <Text textDecoration={'line-through'} color={'gray.600'}>
              $199
            </Text> */}
          </Stack>

          <ShareButton tweet={props.tweet}></ShareButton>
        </Stack>
      </Box>
    </Center>
  );
}