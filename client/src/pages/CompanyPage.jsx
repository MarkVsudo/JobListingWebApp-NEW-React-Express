import { useState, useEffect, useRef } from "react";
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
import { Helmet } from "react-helmet";
import axios from "axios";

const CompanyPage = () => {
  const { companyName } = useParams();
  const [company, setCompany] = useState(null);
  const [followed, setFollowed] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const images = company[0].company_images.split(", ");

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

        <Flex w={[300, 500, 1330]} justify="space-between">
          <VStack w="50%" spacing="2rem">
            {/* About */}
            <Box w="100%">
              <Text pb={3} fontSize="1.5rem" fontWeight={700}>
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
                <Text fontSize="1.5rem" fontWeight={700}>
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
                        <Text as="span" fontWeight={700} fontSize="1.25rem">
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
                        <Text as="span" fontWeight={700} fontSize="1.25rem">
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
              <Text fontSize="1.5rem" fontWeight={700} pb={3}>
                Life at {company[0].name}
              </Text>
              <Flex gap="0.5rem">
                <Box w="66.66%">
                  <Img
                    src={images[0]}
                    alt="Company image 1"
                    borderRadius="1rem"
                    h="100%"
                    objectFit="cover"
                  />
                </Box>
                <Flex direction="column" w="33.33%" gap="0.5rem">
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
              <Text fontSize="1.5rem" fontWeight={700} pb={3}>
                Perks and Benefits
              </Text>
            </Box>
          </VStack>
          <Box w="30%"></Box>
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
