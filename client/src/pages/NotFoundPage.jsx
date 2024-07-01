import { Helmet } from "react-helmet";
import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>NotFoundPage</title>
      </Helmet>
      <Flex
        direction="column"
        justify="center"
        align="center"
        h="100vh"
        textAlign="center"
      >
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, var(--cyan), var(--blue-gray))"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Page Not Found
        </Text>
        <Text color={"gray.500"} mb={6}>
          The page you&apos;re looking for does not seem to exist
        </Text>

        <ChakraLink as={ReactRouterLink} to="/">
          <Button
            colorScheme="teal"
            bgGradient="linear(to-r, var(--cyan), var(--blue-gray), var(--dark-blue))"
            color="white"
            variant="solid"
            w="max-content"
          >
            Go to Home
          </Button>
        </ChakraLink>
      </Flex>
    </>
  );
};

export default NotFoundPage;
