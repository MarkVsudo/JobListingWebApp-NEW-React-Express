import { useEffect, useRef } from "react";
import {
  Heading,
  Img,
  Flex,
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FaMapMarkerAlt } from "react-icons/fa";
import HeroSectionSvg from "../../assets/home-page-svg.svg";
import EllipseHome from "../../assets/ellipse-background-home.svg";
import HomeButton from "./HomeButton";
import { gsap } from "gsap";

const Hero = () => {
  const ellipseRef = useRef(null);

  useEffect(() => {
    gsap.to(ellipseRef.current, {
      y: 20,
      duration: 1.5,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  return (
    <Flex p="2rem 4rem" w="100%" h="100vh" pos="relative">
      <Box display="flex" flexDirection="column" gap="2.75rem">
        <Flex direction="column">
          <Heading
            as="h1"
            color="var(--dark-blue)"
            fontWeight={500}
            fontSize="4.875rem"
          >
            Empower your career journey
          </Heading>
          <Heading
            as="h1"
            color="var(--dark-blue)"
            fontWeight={500}
            fontSize="4.875rem"
          >
            Discover{" "}
            <Text as="span" color="var(--cyan)">
              job opportunities
            </Text>
          </Heading>
          <Heading
            as="h1"
            color="var(--dark-blue)"
            fontWeight={500}
            fontSize="4.875rem"
          >
            now
          </Heading>
        </Flex>
        <Flex direction="column">
          <Flex direction={{ base: "column", md: "row" }} gap="1rem" mb="1rem">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon />}
                h="100%"
              />
              <Input
                type="text"
                placeholder="Job title, keywords, or company"
                size="lg"
                bg="white"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaMapMarkerAlt />}
                h="100%"
              />
              <Input
                type="text"
                placeholder="City, state, zip code, or remote"
                size="lg"
                bg="white"
              />
            </InputGroup>
          </Flex>
          <HomeButton title="Search" onClick={() => console.log("Search")} />
        </Flex>
        <Flex gap={10} color="var(--dark-blue)">
          <Flex direction="column">
            <Text fontSize="2.5rem" fontWeight={700}>
              7856
            </Text>
            <Text fontSize="1.25rem" fontWeight={500}>
              Available job offers
            </Text>
          </Flex>
          <Flex direction="column">
            <Text fontSize="2.5rem" fontWeight={700}>
              2004
            </Text>
            <Text fontSize="1.25rem" fontWeight={500}>
              Companies which trust us
            </Text>
          </Flex>
        </Flex>
      </Box>
      <Img
        src={HeroSectionSvg}
        alt="Hero section image"
        pos="absolute"
        bottom="4.5rem"
        right="1rem"
      />
      <Img
        ref={ellipseRef}
        src={EllipseHome}
        alt="Hero section image"
        pos="absolute"
        left="-1rem"
        bottom="-2rem"
        zIndex="-1"
      />
    </Flex>
  );
};

export default Hero;
