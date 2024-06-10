import { Helmet } from "react-helmet";
import {
  Box,
  Flex,
  Heading,
  Img,
  Text,
  VStack,
  HStack,
  Link,
} from "@chakra-ui/react";
import { FaLinkedin } from "react-icons/fa";
import WhoWeAreImg from "../assets/who-we-are-svg.svg";
import TeamMember1 from "../assets/team-member-1.png";
import TeamMember2 from "../assets/team-member-2.png";
import TeamMember3 from "../assets/team-member-3.png";

let members = [
  {
    img: TeamMember1,
    name: "Anna Maria",
    role: "Chief Executive",
    linkedin: "mark-veskov",
  },
  {
    img: TeamMember2,
    name: "John McNerdy",
    role: "Chief Executive",
    linkedin: "mark-veskov",
  },
  {
    img: TeamMember3,
    name: "Alan Boston",
    role: "Chief Executive",
    linkedin: "mark-veskov",
  },
];

const WhoWeArePage = () => {
  return (
    <Box>
      <Helmet>
        <title>Who We Are</title>
      </Helmet>
      <Flex direction="column" textAlign="center" mx="20rem" py={3}>
        <Heading as="h2" size="lg" mb={10} color="var(--dark-blue)">
          We’re here to make your job seeking <br />
          much easier
        </Heading>
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={3}
          align="center"
          justify="center"
          h="30rem"
        >
          <Flex
            direction="column"
            textAlign="start"
            p={6}
            bg="white"
            borderRadius="1rem"
            w="50%"
            h="100%"
            justifyContent="space-between"
          >
            <VStack spacing={2} align="start">
              <Text fontWeight="bold" color="#00818a">
                How It Started
              </Text>
              <Heading
                as="h2"
                size="xl"
                lineHeight="base"
                color="var(--dark-blue)"
              >
                Our Goal is <br />
                Your Dream Job
              </Heading>
            </VStack>
            <Text>
              At JobConqueror, we're dedicated to transforming career
              aspirations into reality. Our platform stands as a dynamic hub for
              job seekers, offering a curated selection of high-quality job
              listings across diverse industries. With a user-friendly
              interface, we simplify the job search process, providing
              individuals with the tools they need to conquer their dream roles.
              Join JobConqueror to explore exceptional opportunities and embark
              on a journey towards professional success.
            </Text>
          </Flex>
          <VStack w="50%" spacing={0} h="100%">
            <Img
              src={WhoWeAreImg}
              alt="How it started Img"
              borderRadius="1rem"
              h="50%"
            />
            <VStack spacing={5} p={5} bg="white" borderRadius="1rem" w="100%">
              <HStack gap="3rem" w="100%">
                <VStack
                  spacing={1}
                  p={3}
                  bg="gray.100"
                  borderRadius="1rem"
                  w="50%"
                  align="start"
                >
                  <Heading as="h3" size="lg">
                    7
                  </Heading>
                  <Text fontSize="md">Years of experience</Text>
                </VStack>
                <VStack
                  spacing={1}
                  p={3}
                  bg="gray.100"
                  borderRadius="1rem"
                  w="50%"
                  align="start"
                >
                  <Heading as="h3" size="lg">
                    24
                  </Heading>
                  <Text fontSize="md">Events</Text>
                </VStack>
              </HStack>
              <HStack justify="space-around" gap="3rem" w="100%">
                <VStack
                  spacing={1}
                  p={3}
                  bg="gray.100"
                  borderRadius="1rem"
                  align="start"
                  w="50%"
                >
                  <Heading as="h3" size="lg">
                    1200+
                  </Heading>
                  <Text fontSize="md">Clients helped</Text>
                </VStack>
                <VStack
                  spacing={1}
                  p={3}
                  bg="gray.100"
                  borderRadius="1rem"
                  align="start"
                  w="50%"
                >
                  <Heading as="h3" size="lg">
                    120+
                  </Heading>
                  <Text fontSize="md">Companies</Text>
                </VStack>
              </HStack>
            </VStack>
          </VStack>
        </Flex>

        <Heading as="h2" size="lg" my={5}>
          Our team
        </Heading>

        <Flex
          direction={{ base: "column", md: "row" }}
          justify="center"
          align="center"
          gap={5}
          py={5}
        >
          {members.map((member, index) => (
            <Box key={index} textAlign="center" role="group">
              <Img
                src={member.img}
                alt={`${member.name} team member`}
                borderRadius="1rem"
                filter="grayscale(90%)"
                transition="filter 250ms ease-in-out"
                _groupHover={{ filter: "grayscale(0%)" }}
              />
              <Flex
                alignItems="center"
                justifyContent="space-between"
                p={3}
                mt={3}
                transform="translateY(20px)"
                transition="all 500ms ease-in-out"
                opacity={0}
                bg="white"
                borderRadius="1rem"
                _groupHover={{ opacity: 1, transform: "translateY(0)" }}
              >
                <Flex direction="column" align="start">
                  <Text fontWeight="bold">{member.name}</Text>
                  <Text>{member.role}</Text>
                </Flex>
                <Link
                  href={`https://www.linkedin.com/${member.linkedin}`}
                  target="_blank"
                >
                  <FaLinkedin size="2.25rem" color="var(--blue-gray)" />
                </Link>
              </Flex>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default WhoWeArePage;
