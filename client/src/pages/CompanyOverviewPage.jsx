import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  Flex,
  Img,
  Heading,
  Text,
  Box,
  Grid,
  GridItem,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { IoMdPerson } from "react-icons/io";
import axios from "axios";
import HandGif from "../assets/hand-gif.gif";

const rectangleStyles = {
  width: "30rem",
  height: "30rem",
  position: "absolute",
  backgroundColor: "var(--dark-blue)",
  transform: "rotate(45deg)",
};

const CompanyOverviewPage = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("/api/company-overview");
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <>
      <Helmet>
        <title>CompanyOverviewPage</title>
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
              {companies.length}
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

        <Flex
          direction="column"
          position="relative"
          overflow="hidden"
          py="1rem"
          bg="white"
        >
          <Box
            style={{ ...rectangleStyles, left: "-15rem", top: "0rem" }}
          ></Box>
          <Box
            style={{ ...rectangleStyles, right: "-15rem", top: "20rem" }}
          ></Box>
          <Box
            style={{ ...rectangleStyles, left: "-15rem", bottom: "-10rem" }}
          ></Box>
          <Flex
            w="100%"
            direction="column"
            justify="center"
            align="center"
            zIndex="1"
          >
            <Text
              textAlign="center"
              fontSize="1.75rem"
              fontWeight={500}
              pb="1.25rem"
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
          <Flex
            direction="column"
            px="15rem"
            justify="center"
            align="center"
            zIndex="1"
          >
            <Text fontSize="1.75rem" fontWeight={500} py="1.25rem">
              Best companies on our platform
            </Text>
            <Grid templateColumns="repeat(3, 1fr)" gap="1.5rem">
              {companies.map((company) => (
                <GridItem
                  key={company.id}
                  w="100%"
                  bg="var(--light-blue)"
                  borderRadius="1rem"
                  boxShadow="0 0 25px #00000014"
                  transition="all 0.2s ease-in-out"
                  _hover={{ boxShadow: "0 0 25px #00000049" }}
                >
                  <Box position="relative">
                    <Img
                      src={company.banner}
                      alt={`${company.name} banner`}
                      objectFit="cover"
                      w="100%"
                      h="12.5rem"
                      borderRadius="1rem"
                    />
                    <Img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      bg="white"
                      objectFit="contain"
                      w="35%"
                      height="6rem"
                      borderRadius="1rem"
                      border="1px solid gray"
                      position="absolute"
                      right="5%"
                      bottom="-25%"
                    />
                  </Box>
                  <Flex direction="column" justify="center" align="start" p={2}>
                    <Flex w="100%" direction="column" gap={2} align="start">
                      <Text as="span" fontSize="1.25rem" fontWeight={500}>
                        {company.name}
                      </Text>
                      <Flex alignItems="center" gap={1}>
                        <IoMdPerson />
                        <Text as="span">{company.num_employees} employees</Text>
                      </Flex>
                      <Box w="100%" h="1px" bg="var(--dark-blue)" />
                      <ChakraLink
                        as={ReactRouterLink}
                        to="/"
                        fontSize="1.25rem"
                        transition="all 250ms ease-in-out"
                        _hover={{
                          textDecoration: "none",
                          color: "var(--dark-blue)",
                        }}
                      >
                        {company.count_offers} offers listed
                      </ChakraLink>
                    </Flex>
                  </Flex>
                </GridItem>
              ))}
            </Grid>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default CompanyOverviewPage;
