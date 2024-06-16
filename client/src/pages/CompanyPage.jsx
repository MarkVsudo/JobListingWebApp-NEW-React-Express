import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Flex, Button, Box, Img, Text, VStack } from "@chakra-ui/react";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { VscDebugDisconnect } from "react-icons/vsc";
import { PiPlugsConnectedLight } from "react-icons/pi";
import { Helmet } from "react-helmet";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import axios from "axios";

const CompanyPage = () => {
  const { companyName } = useParams();
  const [company, setCompany] = useState(null);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(`/api/company/${companyName}`);
        setCompany(response.data.company);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, [companyName]);

  if (!company) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <Helmet>
        <title>{`JobConqueror - ${company[0].name} `}</title>
      </Helmet>
      <Flex
        direction="column"
        position="relative"
        justify="center"
        align="center"
      >
        <Img
          src={company[0].banner}
          alt="Company banner image"
          w="100%"
          h="17.5rem"
          objectFit="cover"
        />
        <Flex
          w={[300, 500, 1330]}
          bg="white"
          borderRadius="1rem"
          direction="column"
          p="3rem"
          gap="1rem"
          boxShadow="0 0 25px #00000049"
          transform="translateY(-50%)"
        >
          <Flex justify="space-between">
            <Flex gap="1rem">
              <Img
                src={company[0].logo}
                alt="Company logo"
                objectFit="contain"
                width="5rem"
              />
              <Flex direction="column" justify="space-between">
                <Text fontWeight={700} fontSize="1.5rem">
                  {company[0].name}
                </Text>
                <Text fontSize="1.25rem">
                  Discover, save and share creative ideas online.
                </Text>
              </Flex>
            </Flex>
            <Flex gap="1rem">
              <Button
                size="lg"
                bg="white"
                border="1px solid black"
                _hover={{ bg: "#FBFFFF" }}
                p={3}
                aspectRatio="1/1"
              >
                <FaRegShareFromSquare />
              </Button>
              <Button
                size="lg"
                bg="var(--cyan)"
                color="white"
                gap=".5rem"
                _hover={{ bg: "var(--blue-gray)" }}
                onClick={() => setFollowed(true)}
              >
                {followed ? (
                  <>
                    <PiPlugsConnectedLight fontSize="1.5rem" />
                    Followed
                  </>
                ) : (
                  <>
                    <VscDebugDisconnect fontSize="1.5rem" />
                    Follow
                  </>
                )}
              </Button>
            </Flex>
          </Flex>
          <Flex justify="space-between">
            <VStack align="start">
              <Text>Website</Text>
              <Text fontWeight={700} color="blue">
                <ChakraLink
                  as={ReactRouterLink}
                  to={company[0].website}
                  isExternal
                >
                  {company[0].website.split("www.").pop()}
                </ChakraLink>
              </Text>
            </VStack>
            <VStack align="start">
              <Text>Location</Text>
              <Text fontWeight={700}>Sofia, Bulgaria</Text>
            </VStack>
            <VStack align="start">
              <Text>Company Size</Text>
              <Text fontWeight={700}>{company[0].num_employees} Employees</Text>
            </VStack>
            <VStack align="start">
              <Text>Company Industry</Text>
              <Text fontWeight={700}>{company[0].industry}</Text>
            </VStack>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default CompanyPage;
