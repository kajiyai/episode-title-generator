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
    Input
} from '@chakra-ui/react';
import {
    IoAnalyticsSharp,
    IoLogoBitcoin,
    IoSearchSharp,
} from 'react-icons/io5';
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
                    <Text
                        textTransform={'uppercase'}
                        color={'blue.400'}
                        fontWeight={600}
                        fontSize={'sm'}
                        bg={useColorModeValue('blue.50', 'blue.900')}
                        p={2}
                        alignSelf={'flex-start'}
                        rounded={'md'}>
                        New App
                    </Text>
                    <Heading>MTG</Heading>
                    <Text color={'gray.500'} fontSize={'lg'}>
                        You can generate exciting title for manga.
                        Also, You can generate picture on the cover.
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
                            text={'input your keywords'}
                        />

                        {/* テキストボックス */}
                        <form onSubmit={props.gt}>
                            <Input
                                type="text"
                                name="manga"
                                placeholder="キーワードを入力"
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
                    <Image
                        rounded={'md'}
                        alt={'feature image'}
                        src={
                            'https://images.unsplash.com/photo-1548827752-6301e20b3be0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fCVFNiVCQyVBQiVFNyU5NCVCQnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
                        }
                        objectFit={'cover'}
                    />
                </Flex>
            </SimpleGrid>
        </Container>
    );
}