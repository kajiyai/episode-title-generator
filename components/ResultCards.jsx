import { Text, Image, Card, CardHeader, CardBody, CardFooter, Button } from "@chakra-ui/react";
import { ShareButton } from "./index.js"

const ResultCards = (props) => {
  return (
    <>
      <Card maxW='md' p={6}>
        <CardBody>
          <Text fontSize="md">{props.MT}</Text>
          <Image
            objectFit='cover'
            src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
            alt='Chakra UI'
          />
          <Button colorScheme="blue">画像生成</Button>
        </CardBody>
        <CardFooter
          flexWrap='wrap'
          alignItems="center"
        >
          <ShareButton tweet={props.tweet}></ShareButton>
        </CardFooter>
      </Card>
    </>
  )
}

export default ResultCards;