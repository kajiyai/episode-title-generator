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
            src={props.url}
            alt='Chakra UI'
          />
          <form onSubmit={props.GI}>
            <Button
              colorScheme="blue"
              type="submit"
              value={props.MT}>
              画像生成
            </Button>
          </form>
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