import { Box, Flex, Heading, Text, Img } from "@chakra-ui/react";
import OurMissionImg from "../../assets/mission-img.png";

const OurMission = () => {
  return (
    <Box mx="20rem">
      <Heading as="h2" textAlign="center" color="var(--dark-blue)" mb="3rem">
        Our mission
      </Heading>
      <Flex
        justifyContent="center"
        alignItems="center"
        mt={4}
        color="white"
        bg="var(--blue-gray)"
        borderRadius="12px
        "
      >
        <Flex
          direction="column"
          gap={2}
          fontWeight="light"
          p={3}
          flex="1"
          px="2rem"
        >
          <Text as="span" fontSize="2.5rem" fontWeight="bold">
            We help you make{" "}
            <Text
              as="span"
              color="var(--cyan)"
              textDecoration="underline white"
            >
              the first step
            </Text>
          </Text>
          <Text mt={4} fontSize="lg">
            It was a blast! DEV.BG started with the idea to gather all tech
            people in Bulgaria in a single place where they can interact with
            each other, gain insights into their career, level up their
            professional development and can also easily land at their next tech
            job. <br />
            <br />
            Today at DEV.BG there are 30,000+ of them. Along with more than 1200
            partners – tech companies from any type and size – we made the
            difference we were all looking for – Bulgaria now is a great place
            for tech business and a destination for hiring top talents. <br />
            <br />
            This has been an awesome journey, and we are thrilled to be playing
            the leading role in it!
          </Text>
        </Flex>
        <Img
          src={OurMissionImg}
          alt="Mission Image"
          objectFit="cover"
          ml={4}
          borderRadius="12px"
          transform="translate(-30px, -30px)"
        />
      </Flex>
    </Box>
  );
};

export default OurMission;
