import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heading,
  Img,
  Flex,
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FaMapMarkerAlt } from "react-icons/fa";
import HeroSectionSvg from "../../assets/home-page-svg.svg";
import EllipseHome from "../../assets/ellipse-background-home.svg";
import HomeButton from "./HomeButton";
import { gsap } from "gsap";

const Hero = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const ellipseRef = useRef(null);

  const headingFontSize = useBreakpointValue({
    base: "2.5rem",
    md: "3.5rem",
    lg: "4.875rem",
  });
  const statsFontSize = useBreakpointValue({
    base: "1.5rem",
    md: "2rem",
    lg: "2.5rem",
  });
  const statsSubtitleFontSize = useBreakpointValue({
    base: "1rem",
    md: "1.125rem",
    lg: "1.25rem",
  });

  useEffect(() => {
    gsap.to(ellipseRef.current, {
      y: 20,
      duration: 1.5,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  const handleSubmit = () => {
    let params = new URLSearchParams();
    params.append("query", keyword);
    params.append("location", location);
    navigate(`/job-listings?${params.toString()}`);
  };

  return (
    <Flex
      p={{ base: "1rem", md: "2rem 4rem" }}
      w="100%"
      minH="100vh"
      pos="relative"
      direction={{ base: "column", lg: "row" }}
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={{ base: "1.5rem", md: "2.75rem" }}
      >
        <Stack spacing={{ base: 2, md: 4 }}>
          <Heading
            as="h1"
            color="var(--dark-blue)"
            fontWeight={500}
            fontSize={headingFontSize}
            lineHeight="1"
          >
            Empower your career journey
          </Heading>
          <Heading
            as="h1"
            color="var(--dark-blue)"
            fontWeight={500}
            fontSize={headingFontSize}
            lineHeight="1"
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
            fontSize={headingFontSize}
            lineHeight="1"
          >
            now
          </Heading>
        </Stack>
        <Stack spacing={4}>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon />}
                h="100%"
              />
              <Input
                type="text"
                placeholder="Job title or company"
                size="lg"
                bg="white"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
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
                placeholder="City, country, or remote"
                size="lg"
                bg="white"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </InputGroup>
          </Stack>
          <Stack direction="row" spacing={4}>
            <HomeButton title="Search" onClick={handleSubmit} />
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => navigate("/job-listings")}
            >
              All job offers
            </Button>
          </Stack>
        </Stack>
        <Flex gap={{ base: 5, sm: 10 }} color="var(--dark-blue)">
          <Flex direction="column">
            <Text fontSize={statsFontSize} fontWeight={700}>
              7856
            </Text>
            <Text fontSize={statsSubtitleFontSize} fontWeight={500}>
              Available job offers
            </Text>
          </Flex>
          <Flex direction="column">
            <Text fontSize={statsFontSize} fontWeight={700}>
              2004
            </Text>
            <Text fontSize={statsSubtitleFontSize} fontWeight={500}>
              Companies which trust us
            </Text>
          </Flex>
        </Flex>
      </Box>
      <Img
        src={HeroSectionSvg}
        alt="Hero section image"
        pos="absolute"
        display={{ base: "none", "2xl": "block" }}
        bottom="4.5rem"
        right="1rem"
        maxW="40%"
        zIndex="-1"
        mt="0"
      />
      <Img
        ref={ellipseRef}
        src={EllipseHome}
        alt="Hero section image"
        pos="absolute"
        left="-1rem"
        bottom="-2rem"
        zIndex="-1"
        display={{ base: "none", lg: "block" }}
      />
    </Flex>
  );
};

export default Hero;
