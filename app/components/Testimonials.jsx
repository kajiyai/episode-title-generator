import { ReactNode } from 'react';
import {
    Box,
    Flex,
    Heading,
    Text,
    Stack,
    Container,
    Avatar,
    useColorModeValue,
    Image,
    propNames,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react';

const Testimonial = ({ children }) => {
    return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }) => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'lg'}
            p={8}
            rounded={'xl'}
            align={'center'}
            pos={'relative'}
            _after={{
                content: `""`,
                w: 0,
                h: 0,
                borderLeft: 'solid transparent',
                borderLeftWidth: 16,
                borderRight: 'solid transparent',
                borderRightWidth: 16,
                borderTop: 'solid',
                borderTopWidth: 16,
                borderTopColor: useColorModeValue('white', 'gray.800'),
                pos: 'absolute',
                bottom: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
            }}>
            {children}
        </Stack>
    );
};

const TestimonialHeading = ({ children }) => {
    return (
        <Heading as={'h3'} fontSize={'xl'}>
            {children}
        </Heading>
    );
};

const TestimonialText = ({ children }) => {
    return (
        <Text
            textAlign={'center'}
            color={useColorModeValue('gray.600', 'gray.400')}
            fontSize={'sm'}>
            {children}
        </Text>
    );
};

// Imageも作ってみた
const TestimonialImage = ({ children }) => {
    return (
        <Image
            rounded={'lg'}
            height={256}
            width={256}
            objectFit={'cover'}
            src={children}
            fallbackSrc='https://via.placeholder.com/256'
        />
    );
};

const TestimonialAvatar = ({
    src,
    name,
    title,
}) => {
    return (
        <Flex align={'center'} mt={8} direction={'column'}>
            <Avatar src={src} alt={name} mb={2} />
            <Stack spacing={-1} align={'center'}>
                <Text fontWeight={600}>{name}</Text>
                <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
                    {title}
                </Text>
            </Stack>
        </Flex>
    );
};

export default function WithSpeechBubbles(props) {
    return (
        <Container maxW={'7xl'} py={12}>
            <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem>
                    <AccordionButton py={4}>
                        <Box as="span" flex='1' textAlign='center' >
                            <Heading as="h3" fontSize="2xl">
                                使用例
                            </Heading>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel py={4}>
                        <Box bg={useColorModeValue('gray.100', 'gray.700')}>
                            <Container maxW={'100%'} py={16} as={Stack} spacing={6} align="center">
                                <Stack spacing={0} align={'center'} pb={4}>
                                    <Heading as="h3" fontSize="4xl">
                                        使用例
                                    </Heading>
                                    {/* <Text>We have been working with clients around the world</Text> */}
                                </Stack>
                                <Stack
                                    direction={{ base: 'column', md: 'row' }}
                                    spacing={{ base: 10, md: 4, lg: 10 }}>
                                    <Testimonial>
                                        <TestimonialContent>
                                            <TestimonialHeading>「王様は犬だった」</TestimonialHeading>
                                            <TestimonialImage>
                                                {/* imgのlocalパスを入力する　*/}
                                                /img/tes1.png
                                            </TestimonialImage>
                                            <TestimonialText>
                                                入力:「犬     王」
                                            </TestimonialText>
                                        </TestimonialContent>
                                        <TestimonialAvatar
                                            src={
                                                '/img/kajiyai.jpg'
                                            }
                                            name={'kajiyai'}
                                            title={'developer'}
                                        />
                                    </Testimonial>
                                    <Testimonial>
                                        <TestimonialContent>
                                            <TestimonialHeading>「ホットドッグスライダーズ」</TestimonialHeading>
                                            <TestimonialImage>
                                                {/* imgのlocalパスを入力する　*/}
                                                /img/tes2.png
                                            </TestimonialImage>
                                            <TestimonialText>
                                                入力:「ホットドッグ」
                                            </TestimonialText>
                                        </TestimonialContent>
                                        <TestimonialAvatar
                                            src={
                                                '/img/kajiyai.jpg'
                                            }
                                            name={'kajiyai'}
                                            title={'developer'}
                                        />
                                    </Testimonial>
                                    <Testimonial>
                                        <TestimonialContent>
                                            <TestimonialHeading>「世界最強の葬儀屋」</TestimonialHeading>
                                            <TestimonialImage>
                                                {/* imgのlocalパスを入力する　*/}
                                                /img/tes4.png
                                            </TestimonialImage>
                                            <TestimonialText>
                                                入力:「世界一」
                                            </TestimonialText>
                                        </TestimonialContent>
                                        <TestimonialAvatar
                                            src={
                                                '/img/kajiyai.jpg'
                                            }
                                            name={'kajiyai'}
                                            title={'developer'}
                                        />
                                    </Testimonial>
                                </Stack>
                            </Container>
                        </Box>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Container >
    );
}