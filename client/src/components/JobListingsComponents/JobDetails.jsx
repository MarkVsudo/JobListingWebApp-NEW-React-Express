import React from "react";
import DOMPurify from "dompurify";
import { Flex, Img, Text, VStack, Divider } from "@chakra-ui/react";
import HomeButton from "../HomeComponents/HomeButton";

const JobDetails = ({ currentOffer }) => {
  const sanitizedDescription = currentOffer
    ? DOMPurify.sanitize(currentOffer.description)
    : "";

  return (
    <Flex
      w="100%"
      direction="column"
      align="flex-start"
      borderRadius="1rem"
      bg="white"
      boxShadow="var(--box-shadow)"
    >
      <Flex p="0.75rem 2rem" w="100%" justify="space-between" align="center">
        <Flex justify="space-between" align="center">
          <Img
            src={currentOffer.company_logo}
            alt="Job offer company logo"
            objectFit="contain"
            w="50px"
            h="50px"
            mr="2rem"
          />
          <VStack align="flex-start">
            <Text fontSize="1.25rem" fontWeight={600}>
              {currentOffer.title}
            </Text>
            <Text fontWeight={300}>{currentOffer.short_description}</Text>
          </VStack>
        </Flex>
        <Flex ml="2rem">
          <HomeButton title="Apply now" />
        </Flex>
      </Flex>
      <Divider w="95%" alignSelf="center" mb="1rem" />
      <Flex
        className="job-description"
        direction="column"
        p="0 2rem 2rem 2rem"
        dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
      />
    </Flex>
  );
};

export default JobDetails;
