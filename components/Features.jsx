import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    StackDivider,
    Icon,
    useColorModeValue,
    Input,
    Box,
    Button,
    HStack,
    IconButton,
} from '@chakra-ui/react';
import {
    IoAnalyticsSharp,
    IoLogoBitcoin,
    IoSearchSharp,
} from 'react-icons/io5';
import {
    BsMoonFill,
    BsSunFill
} from 'react-icons/bs'
import { ReactElement } from 'react';


const Feature = (props) => {
    return (
        <Stack direction={'row'} align={'center'}>
            <Flex
                w={8}
                h={8}
                align={'center'}
                justify={'center'}
                rounded={'full'}
                bg={props.iconBg}>
                {props.icon}
            </Flex>
            <Text fontWeight={600}>{props.text}</Text>
        </Stack>
    );
};

export default function Features(props) {
    return (
        <Container maxW={'5xl'} py={12}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <Stack spacing={4}>
                    <HStack>
                        <Text
                            textTransform={'uppercase'}
                            color={'blue.400'}
                            fontWeight={600}
                            fontSize={'sm'}
                            bg={useColorModeValue('blue.50', 'blue.900')}
                            p={2}
                            alignSelf={'flex-start'}
                            rounded={'md'}>
                            OPENAI
                        </Text>
                        <IconButton
                            // _focus={{_focus: "none"}} //周りの青いアウトラインが気になる場合に消す方法
                            aria-label="DarkMode Switch"
                            icon={props.cm === 'light' ? <BsMoonFill /> : <BsSunFill />}
                            onClick={props.tcm}
                        />
                    </HStack>
                    <Heading>エピタイ!!</Heading>
                    <Text color={'gray.500'} fontSize={'lg'}>
                        漫画のエピソードタイトルと挿絵を作ろう!!
                    </Text>
                    <Stack
                        spacing={4}
                        divider={
                            <StackDivider
                                borderColor={useColorModeValue('gray.100', 'gray.700')}
                            />
                        }>
                        {/* <Feature
                            icon={
                                <Icon as={IoAnalyticsSharp} color={'yellow.500'} w={5} h={5} />
                            }
                            iconBg={useColorModeValue('yellow.100', 'yellow.900')}
                            text={'Super'}
                        />
                        <Feature
                            icon={<Icon as={IoLogoBitcoin} color={'green.500'} w={5} h={5} />}
                            iconBg={useColorModeValue('green.100', 'green.900')}
                            text={'Ultra'}
                        /> */}
                        <Feature
                            icon={
                                <Icon as={IoSearchSharp} color={'purple.500'} w={5} h={5} />
                            }
                            iconBg={useColorModeValue('purple.100', 'purple.900')}
                            text={'キーワードを入力しよう！'}
                        />

                        {/* テキストボックス */}
                        <form onSubmit={props.gt}>
                            <Input
                                type="text"
                                name="manga"
                                placeholder="例) 犬"
                                value={props.mi}
                                variant="filled"
                                onChange={(e) => props.smi(e.target.value)}
                                mb={6}
                                // プレースホルダーが見えない！後々に要確認！！
                                background="gray.200"
                            />
                            <Input type="submit" mb={6} background="green.500" value="タイトルを生成" color="white" />
                        </form>

                    </Stack>
                </Stack>
                <Flex>
                    <Box bg='gray.300' width='100%' rounded={'md'} alignItems='center' justifyContent='center' color='black'>
                        <Stack spacing={3} p={6}>
                            <Text fontSize='3xl'>使い方</Text>
                            <Text fontSize='lg'>漫画仕様のエピソードタイトルと挿絵画像をAIと共につくります</Text>
                            <Text fontSize='md'>キーワードを入力してタイトル生成ボタンを押すと、関連した漫画のタイトルが生成されます</Text>
                            <Text fontSize='md'>呪文生成ボタンを押すと、画像生成用の呪文が生成されます</Text>
                            <Text fontSize='md'>画像生成ボタンを押すと、タイトルに合った(??)画像が生成されます</Text>
                            <Text fontSize='md'>※※呪文生成ボタンを押してから画像生成ボタンを押してみて下さい※※</Text>
                            <Text fontSize='md'>※※エラーが出たら、2,3回試してみて下さい※※</Text>
                        </Stack>
                    </Box>
                    {/* <Image
                        rounded={'md'}
                        alt={'feature image'}
                        src={
                            'https://images.unsplash.com/photo-1548827752-6301e20b3be0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fCVFNiVCQyVBQiVFNyU5NCVCQnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
                        }
                        objectFit={'cover'}
                    /> */}
                </Flex>
            </SimpleGrid>
        </Container>
    );
}