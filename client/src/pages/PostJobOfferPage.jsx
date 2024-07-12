import { Helmet } from "react-helmet";
import { useState } from "react";
import axios from "axios";
import { Flex, Text } from "@chakra-ui/react";

const PostJobOfferPage = () => {
  return (
    <>
      <Helmet>
        <title>JobConqueror - Who We Are</title>
      </Helmet>
      <Flex mx="10rem">
        <Text fontSize="1.25rem" fontWeight={700} mb="1rem">
          Post a job offer
        </Text>
      </Flex>
    </>
  );
};

export default PostJobOfferPage;
