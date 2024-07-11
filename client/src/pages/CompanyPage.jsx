import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Flex,
  Button,
  Box,
  Img,
  Text,
  VStack,
  HStack,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Grid,
  GridItem,
  Tooltip,
} from "@chakra-ui/react";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { VscDebugDisconnect } from "react-icons/vsc";
import { PiPlugsConnectedLight } from "react-icons/pi";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { BsLungs } from "react-icons/bs";
import { LuHeartPulse } from "react-icons/lu";
import { GoGift } from "react-icons/go";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa6";
import { RxDotsVertical } from "react-icons/rx";
import { SlLocationPin } from "react-icons/sl";
import { FiPhone } from "react-icons/fi";

import { Helmet } from "react-helmet";
import axios from "axios";

const CompanyPage = () => {
  const { companyName } = useParams();
  const [company, setCompany] = useState(null);
  const [companies, setCompanies] = useState(null);
  const [followed, setFollowed] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(`/api/company/${companyName}`);
        setCompany(response.data.company);
        setCompanies(response.data.companies);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, [companyName]);

  // Loading state if no response
  if (!company || !companies) {
    return (
      <Flex direction="column" justify="center" align="center" minHeight="65vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  // Life at company section
  const images = company[0].company_images.split(", ");

  // Perks section
  const companyPerks = company[0].company_perks
    .split(",")
    .map((perk) => perk.trim());

  const getIconForPerk = (perk) => {
    switch (perk.toLowerCase()) {
      case "healthcare benefits":
        return (
          <MdOutlineHealthAndSafety color="var(--cyan)" fontSize="1.75rem" />
        );
      case "wellness benefits":
        return <BsLungs color="var(--cyan)" fontSize="1.75rem" />;
      case "sick leave":
        return <LuHeartPulse color="var(--cyan)" fontSize="1.75rem" />;
      case "birthday salary":
        return <GoGift color="var(--cyan)" fontSize="1.75rem" />;
      case "careers growth":
        return <BsGraphUpArrow color="var(--cyan)" fontSize="1.75rem" />;
      default:
        return <FaRegStar color="var(--cyan)" fontSize="1.75rem" />;
    }
  };

  const maxPerksToShow = 5;
  const visiblePerks = companyPerks.slice(0, maxPerksToShow);
  const remainingPerks = companyPerks.slice(maxPerksToShow);

  // People Also View section
  const maxCompaniesListed = 6;
  const listedCompanies = companies[0]
    .slice(0, maxCompaniesListed)
    .filter((item) => item.name !== companyName);

  return (
    <>
      <Helmet>
        <title>{`JobConqueror - ${company[0].name}`}</title>
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
          h={["10rem", "15rem", "17.5rem"]}
          objectFit="cover"
        />
        <Flex
          w={["90%", "90%", "1330px"]}
          maxW="90%"
          bg="white"
          borderRadius="1rem"
          direction="column"
          p={["1rem", "2rem", "3rem"]}
          gap="1rem"
          boxShadow="0 0 25px #00000049"
          transform="translateY(-50%)"
        >
          <Flex
            direction={["column", "row"]}
            justify="space-between"
            align="center"
          >
            <Flex gap="1rem" align="center">
              <Img
                src={company[0].logo}
                alt="Company logo"
                objectFit="contain"
                w={["3rem", "4rem", "5rem"]}
                h={["3rem", "4rem", "5rem"]}
              />
              <Flex direction="column" justify="space-between">
                <Text fontWeight={700} fontSize={["1rem", "1.25rem", "1.5rem"]}>
                  {company[0].name}
                </Text>
                <Text fontSize={["0.875rem", "1rem", "1.25rem"]}>
                  Discover, save and share creative ideas online.
                </Text>
              </Flex>
            </Flex>
            <Flex gap="1rem" mt={["1rem", "0"]}>
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
                size={"lg"}
                bg="var(--cyan)"
                color="white"
                gap=".5rem"
                _hover={{ bg: "var(--blue-gray)" }}
                onClick={() => setFollowed(!followed)}
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
          <Flex
            direction={["column", "row"]}
            justify="space-between"
            gap="1rem"
          >
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
              <Text fontWeight={700}>{company[0].company_address}</Text>
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

        <Flex
          direction={["column", "column", "row"]}
          w="100%"
          maxW="1330px"
          justify="space-between"
          pb="5rem"
        >
          <Flex w={["100%", "100%", "50%"]} gap="2rem" direction="column">
            {/* About */}
            <Box w="100%">
              <Text pb={3} fontSize={["1.25rem", "1.5rem"]} fontWeight={700}>
                About {company[0].name}
              </Text>
              <Box textAlign="justify">
                At JobConqueror, we're dedicated to transforming career
                aspirations into reality. Our platform stands as a dynamic hub
                for job seekers, offering a curated selection of high-quality
                job listings across diverse industries. With a user-friendly
                interface, we simplify the job search process, providing
                individuals with the tools they need to conquer their dream
                roles. Join JobConqueror to explore exceptional opportunities
                and embark on a journey towards professional success...{" "}
                <Button
                  variant="link"
                  _hover={{ textDecoration: "none" }}
                  color="rgb(13,110,253)"
                  fontWeight={400}
                >
                  Read more
                </Button>
              </Box>
            </Box>
            {/* Jobs */}
            <Box w="100%">
              <Flex justify="space-between" align="center" pb={3}>
                <Text fontSize={["1.25rem", "1.5rem"]} fontWeight={700}>
                  Jobs From {company[0].name}
                </Text>
                <ChakraLink
                  as={ReactRouterLink}
                  to="/job-listings"
                  _hover={{ textDecoration: "none" }}
                  color="rgb(13,110,253)"
                >
                  View All Jobs
                </ChakraLink>
              </Flex>
              <VStack spacing="1rem">
                <Flex
                  direction="column"
                  bg="white"
                  boxShadow="0 0 25px #00000049"
                  borderRadius="1rem"
                  gap="0.75rem"
                  p="1rem"
                  w="100%"
                >
                  <HStack justify="space-between" align="start">
                    <Flex gap="0.5rem" align="center">
                      <Img
                        src={company[0].logo}
                        alt="Company logo"
                        w="3.5rem"
                        h="3.5rem"
                        objectFit="contain"
                        pr={1}
                      />
                      <VStack justify="space-between" align="flex-start">
                        <Text
                          as="span"
                          fontWeight={700}
                          fontSize={["1rem", "1.25rem"]}
                        >
                          Back-end engineer
                        </Text>
                        <Text as="span">Varna, Bulgaria</Text>
                      </VStack>
                    </Flex>
                    <IoBookmarkOutline color="var(--cyan)" fontSize="1.5rem" />
                  </HStack>
                  <HStack spacing={2}>
                    <Text as="span" bg="#f8f8f8" p=".25rem">
                      Internship
                    </Text>
                    <Text as="span" bg="#f8f8f8" p=".25rem">
                      Onsite
                    </Text>
                    <Text as="span" bg="#f8f8f8" p=".25rem">
                      Fresh Graduate
                    </Text>
                  </HStack>
                  <Text color="rgba(33, 37, 41, 0.75)">
                    12 days ago | 47 applicants
                  </Text>
                </Flex>
                <Flex
                  direction="column"
                  bg="white"
                  boxShadow="0 0 25px #00000049"
                  borderRadius="1rem"
                  gap="0.75rem"
                  p="1rem"
                  w="100%"
                >
                  <HStack justify="space-between" align="start">
                    <Flex gap="0.5rem" align="center">
                      <Img
                        src={company[0].logo}
                        alt="Company logo"
                        w="3.5rem"
                        h="3.5rem"
                        objectFit="contain"
                        pr={1}
                      />
                      <VStack justify="space-between" align="flex-start">
                        <Text
                          as="span"
                          fontWeight={700}
                          fontSize={["1rem", "1.25rem"]}
                        >
                          Web Developer
                        </Text>
                        <Text as="span">Sofia, Bulgaria</Text>
                      </VStack>
                    </Flex>
                    <IoBookmark color="var(--cyan)" fontSize="1.5rem" />
                  </HStack>
                  <HStack spacing={2}>
                    <Text as="span" bg="#f8f8f8" p=".25rem">
                      Full Time
                    </Text>
                    <Text as="span" bg="#f8f8f8" p=".25rem">
                      Remote
                    </Text>
                    <Text as="span" bg="#f8f8f8" p=".25rem">
                      2-4 years
                    </Text>
                  </HStack>
                  <Text color="rgba(33, 37, 41, 0.75)">
                    5 days ago | 135 applicants
                  </Text>
                </Flex>
              </VStack>
            </Box>
            {/* Photos */}
            <Box w="100%">
              <Text fontSize={["1.25rem", "1.5rem"]} fontWeight={700} pb={3}>
                Life at {company[0].name}
              </Text>
              <Flex gap="0.5rem" flexDirection={["column", "row"]}>
                <Box w={["100%", "66.66%"]}>
                  <Img
                    src={images[0]}
                    alt="Company image 1"
                    borderRadius="1rem"
                    h="100%"
                    objectFit="cover"
                  />
                </Box>
                <Flex direction="column" w={["100%", "33.33%"]} gap="0.5rem">
                  <Img
                    src={images[1]}
                    alt="Company image 1"
                    borderRadius="1rem"
                  />
                  <Box position="relative" display="inline-block">
                    <Img
                      src={images[2]}
                      alt="Company image 2"
                      borderRadius="1rem"
                    />
                    <Box
                      position="absolute"
                      top="0"
                      left="0"
                      right="0"
                      bottom="0"
                      bg="rgba(0, 0, 0, 0.5)"
                      borderRadius="1rem"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      onClick={onOpen}
                      cursor="pointer"
                    >
                      <Text color="white" fontSize="lg">
                        See more
                      </Text>
                    </Box>
                  </Box>
                </Flex>
              </Flex>
            </Box>
            {/* Benefits */}
            <Box w="100%">
              <Text fontSize={["1.25rem", "1.5rem"]} fontWeight={700} pb={3}>
                Perks and Benefits
              </Text>
              <Grid
                templateColumns={[
                  "repeat(1, 1fr)",
                  "repeat(2, 1fr)",
                  "repeat(3, 1fr)",
                ]}
                gap="1rem"
                p="1rem"
                justifyContent="space-around"
                bg="white"
                boxShadow="0 0 25px #00000049"
                borderRadius="1rem"
              >
                {visiblePerks.map((perk, index) => (
                  <GridItem key={index}>
                    <Flex align="center" gap="1rem">
                      <Flex
                        justify="center"
                        align="center"
                        bg="var(--light-blue)"
                        p={2}
                        w="3rem"
                        h="3rem"
                        borderRadius="1rem"
                      >
                        {getIconForPerk(perk)}
                      </Flex>
                      <Text noOfLines={2}>{perk}</Text>
                    </Flex>
                  </GridItem>
                ))}
                {remainingPerks.length > 0 && (
                  <GridItem>
                    <Flex align="center" gap="1rem">
                      <Tooltip
                        label={remainingPerks.join(", ")}
                        fontSize="md"
                        placement="top"
                      >
                        <Flex
                          justify="center"
                          align="center"
                          bg="#f8f8f8"
                          p={2}
                          w="3rem"
                          h="3rem"
                          borderRadius="1rem"
                          cursor="pointer"
                        >
                          <RxDotsVertical fontSize="1.75rem" color="grey" />
                        </Flex>
                      </Tooltip>
                      <Text color="rgb(13,110,253)">
                        +{remainingPerks.length} more
                      </Text>
                    </Flex>
                  </GridItem>
                )}
              </Grid>
            </Box>
          </Flex>
          <Flex w={["100%", "100%", "35%"]} gap="2rem" direction="column">
            {/* People also view */}
            <Box w="100%">
              <Text pb={3} fontSize={["1.25rem", "1.5rem"]} fontWeight={700}>
                People Also View
              </Text>
              <Flex
                direction="column"
                borderRadius="1rem"
                bg="white"
                boxShadow="0 0 25px #00000049"
                p="1rem"
                gap="1.5rem"
              >
                {listedCompanies.map((company, index) => (
                  <ChakraLink
                    key={index}
                    as={ReactRouterLink}
                    to={`/company/${company.name}`}
                    _hover={{ textDecoration: "none" }}
                  >
                    <Flex
                      justify="space-between"
                      position="relative"
                      _hover={{
                        ".innerFlex": { transform: "translateX(10px)" },
                      }}
                    >
                      <Flex
                        direction="column"
                        align="flex-start"
                        justify="space-between"
                        className="innerFlex"
                        transition="transform 0.3s"
                      >
                        <Text fontWeight={700}>{company.name}</Text>
                        <Text>{company.company_address}</Text>
                      </Flex>
                      <Img
                        src={company.logo}
                        alt={`${company.name} company logo`}
                        w="3rem"
                        h="3rem"
                        objectFit="contain"
                      />
                    </Flex>
                  </ChakraLink>
                ))}
              </Flex>
            </Box>
            {/* Location */}
            <Box w="100%">
              <Text pb={3} fontSize={["1.25rem", "1.5rem"]} fontWeight={700}>
                Location
              </Text>
              <Flex
                direction="column"
                borderRadius="1rem"
                bg="white"
                boxShadow="0 0 25px #00000049"
                p="1rem"
                gap="1.5rem"
              >
                <ChakraLink
                  as={ReactRouterLink}
                  to={company[0].google_maps_url}
                  isExternal
                  _hover={{ textDecoration: "none" }}
                  display="flex"
                  alignItems="center"
                  gap="0.5rem"
                >
                  <SlLocationPin fontSize="1.125rem" />
                  <Text>{company[0].company_address}</Text>
                </ChakraLink>
                <iframe
                  src={company[0].google_maps_iframe}
                  width="fit-content"
                  height="250"
                  borderRadius="1rem"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <ChakraLink
                  as={ReactRouterLink}
                  to={`tel:${company[0].contact_phone}`}
                  _hover={{ textDecoration: "none" }}
                  display="flex"
                  alignItems="center"
                  gap="0.5rem"
                >
                  <FiPhone fontSize="1.125rem" />
                  <Text>{company[0].contact_phone}</Text>
                </ChakraLink>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalBody p="0">
            <Swiper
              navigation={true}
              modules={[Autoplay, Navigation]}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              effect="fade"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <Box>
                    <Img
                      src={image}
                      alt={`Company image ${index + 1}`}
                      w="100%"
                    />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CompanyPage;
