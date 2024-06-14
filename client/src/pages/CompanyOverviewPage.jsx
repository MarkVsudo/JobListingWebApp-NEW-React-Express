import { Helmet } from "react-helmet";
import { Flex, Img, Heading, Text, Box, position } from "@chakra-ui/react";
import HandGif from "../assets/hand-gif.gif";

const rectangleStyles = {
  width: "30rem",
  height: "30rem",
  position: "absolute",
  backgroundColor: "var(--dark-blue)",
  transform: "rotate(45deg)",
};

const CompanyOverviewPage = () => {
  return (
    <>
      <Helmet>
        <title>CompanyOverviewPage </title>
      </Helmet>
      <Flex direction="column" gap="4rem" mx="4rem" my="4rem">
        <Flex
          bg="var(--dark-blue)"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
          p={6}
        >
          <Heading as="h1" fontSize="4rem" color="var(--light-blue)" mb="1rem">
            <Text as="span" color="var(--cyan)" pr="1rem" fontSize="6rem">
              2392
            </Text>
            <Text as="span">companies</Text>
            <br />
            <Box pt="1.5rem" />
            <Text as="span" fontWeight={400}>
              offering job opportunities
            </Text>
          </Heading>
          <Img
            src={HandGif}
            alt="Hand gif"
            h="20rem"
            w="50rem"
            objectFit="cover"
            transform="rotate(-10deg)"
          />
        </Flex>

        <Flex position="relative" overflow="hidden" py="1rem" bg="white">
          <Box
            style={{ ...rectangleStyles, left: "-15rem", top: "0rem" }}
          ></Box>
          <Box
            style={{ ...rectangleStyles, right: "-15rem", top: "20rem" }}
          ></Box>
          <Box
            style={{ ...rectangleStyles, left: "-15rem", bottom: "-10rem" }}
          ></Box>
          <Flex w="100%" direction="column" justify="center" align="center">
            <Text
              textAlign="center"
              fontSize="1.75rem"
              fontWeight={500}
              pb="2rem"
            >
              Most sought for company of the month
            </Text>
            <Flex
              direction="column"
              bg="var(--light-blue)"
              position="relative"
              borderRadius="1rem"
              height="350px"
              gap="1.5rem"
              transition="all 0.2s ease-in-out"
              boxShadow="0 0 25px #00000014"
              _hover={{
                boxShadow: "0 0 25px #00000049",
              }}
            >
              <Img
                src="https://media.dkcompany.com/sitecore-images/topbillder1537x550px_AO24.jpg?i=gMn1nVpc/18fea8bf-d710-45cb-b30c-3e23f8f38dff&mw=1440"
                alt="Most sought for company of the month banner"
                objectFit="cover"
                w="100%"
                height="200px"
                borderRadius="1rem"
              />
              <Img
                src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/construction-company-logo%2C-real-estate-logo-design-template-fbb1bf5a44046d04e6503c514592c213_screen.jpg?ts=1667737322"
                alt="Most sought for company of the month logo"
                objectFit="cover"
                w="150px"
                h="100px"
                borderRadius="1rem"
                border="1px solid gray"
                position="absolute"
                left="50%"
                top="60%"
                transform="translate(-50%, -60%)"
              />
              <Flex
                justify="space-evenly"
                alignItems="center"
                textAlign="center"
                fontSize="1.25rem"
              >
                <Flex
                  direction="column"
                  gap="1rem"
                  justify="space-between"
                  h="100%"
                  w="33%"
                >
                  <Text as="span">500 employees</Text>
                  <Text as="span">45 job offers</Text>
                </Flex>
                <Flex direction="column" w="33%">
                  <Text as="span" fontWeight={600}>
                    RealEST LTD.
                  </Text>
                </Flex>
                <Flex
                  direction="column"
                  gap="1rem"
                  justify="space-between"
                  w="33%"
                  h="100%"
                >
                  <Text as="span">Information Technology (IT)</Text>
                  <Text as="span">Learn more...</Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default CompanyOverviewPage;
