import { useRef, useEffect } from "react";
import {
  Heading,
  Img,
  Flex,
  Grid,
  GridItem,
  Text,
  Box,
} from "@chakra-ui/react";
import LearnFromExpertsImg from "../../assets/experts-section-img.png";
import TutorialSvg from "../../assets/tutorial-svg.svg";
import { FaArrowRight } from "react-icons/fa6";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let advices = [
  {
    icon: TutorialSvg,
    title: "How to write the perfect CV?",
    text: "It was a blast! DEV.BG started with the idea to gather all tech people in Bulgaria in a single place where they can interact with each other, gain insights into their career, level up their professional development and can also in Bulgaria in a single in Bulgaria in a single in Bulgaria in a single in Bulgaria in a single ...",
  },
  {
    icon: TutorialSvg,
    title: "How to write the perfect CV?",
    text: "It was a blast! DEV.BG started with the idea to gather all tech people in Bulgaria in a single place where they can interact with each other, gain insights into their career, level up their professional development and can also in Bulgaria in a single in Bulgaria in a single in Bulgaria in a single in Bulgaria in a single ...",
  },
  {
    icon: TutorialSvg,
    title: "How to write the perfect CV?",
    text: "It was a blast! DEV.BG started with the idea to gather all tech people in Bulgaria in a single place where they can interact with each other, gain insights into their career, level up their professional development and can also in Bulgaria in a single in Bulgaria in a single in Bulgaria in a single in Bulgaria in a single ...",
  },
  {
    icon: TutorialSvg,
    title: "How to write the perfect CV?",
    text: "It was a blast! DEV.BG started with the idea to gather all tech people in Bulgaria in a single place where they can interact with each other, gain insights into their career, level up their professional development and can also in Bulgaria in a single in Bulgaria in a single in Bulgaria in a single in Bulgaria in a single ...",
  },
];

const LearnFromExperts = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const headings = container.querySelectorAll("h2");
    const mainImage = container.querySelector(".main-image");
    const adviceCards = container.querySelectorAll(".advice-card");

    gsap.set([...headings, mainImage, ...adviceCards], {
      opacity: 0,
      y: -50,
    });

    ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      onEnter: () => {
        gsap.to(headings[0], { opacity: 1, y: 0, duration: 0.7 });
        gsap.to(headings[1], { opacity: 1, y: 0, duration: 0.7, delay: 0.3 });
        gsap.to(mainImage, { opacity: 1, y: 0, duration: 0.7, delay: 0.6 });
        gsap.to(adviceCards, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.2,
          delay: 0.9,
        });
      },
      once: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <Flex
      ref={containerRef}
      direction="column"
      justifyContent="center"
      alignItems="center"
      color="var(--dark-blue)"
      m={{ base: "2rem", md: "5rem", lg: "10rem 20rem" }}
      gap="1rem"
    >
      <Heading
        as="h2"
        size={{ base: "md", md: "lg", lg: "xl" }}
        fontWeight={500}
        textAlign="center"
      >
        Learn from our experts
      </Heading>
      <Heading
        as="h2"
        size={{ base: "sm", lg: "md" }}
        fontWeight={200}
        textAlign="center"
        px={{ base: "1rem", md: "2rem" }}
      >
        Explore our curated resources at JobConqueror, designed by industry
        experts, to empower you with valuable insights and knowledge as you
        prepare for your job search journey.
      </Heading>

      <Grid
        templateColumns={`repeat({ base: 1, md: 2, lg: 4 }, 1fr)`}
        gap="2rem"
        w="100%"
      >
        <GridItem colSpan={{ base: 1, md: 2, lg: 4 }} borderRadius="12px">
          <Img
            className="main-image"
            src={LearnFromExpertsImg}
            alt="Learn from experts image"
            w="100%"
          />
        </GridItem>
        {advices.map((advice, index) => (
          <GridItem
            key={index}
            className="advice-card"
            bg="var(--blue-gray)"
            color="white"
            borderRadius="12px"
            paddingInline="1rem"
          >
            <Flex
              direction="column"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
            >
              <Box
                bg="white"
                w={{ base: "50px", md: "65px" }}
                h={{ base: "50px", md: "65px" }}
                borderRadius="50%"
                pos="relative"
                overflow="hidden"
                border="3px solid var(--blue-gray)"
                top="-25px"
                display="grid"
                placeItems="center"
              >
                <Img
                  src={advice.icon}
                  alt="Tutorial svg"
                  pos="absolute"
                  left="10px"
                  w={{ base: "30px", md: "40px" }}
                />
              </Box>
              <Text fontWeight={700} fontSize={{ base: "md", md: "lg" }} mb={2}>
                {advice.title}
              </Text>
              <Text textAlign="justify" fontSize={{ base: "sm", md: "md" }}>
                {advice.text}
              </Text>
              <ChakraLink
                as={ReactRouterLink}
                to="/recommendations"
                display="grid"
                placeSelf="end"
                placeItems="center"
                pos="relative"
                right={{ base: "-20px", md: "-35px" }}
                bottom="10px"
                w={{ base: "45px", md: "55px" }}
                h={{ base: "45px", md: "55px" }}
                overflow="hidden"
                borderRadius="50%"
                border="3px solid var(--blue-gray)"
                bg="white"
                sx={{
                  ".fa-arrow-right": {
                    transition: "transform 250ms ease-in-out",
                  },
                  "&:hover .fa-arrow-right": {
                    transform: "translateX(4px)",
                  },
                }}
              >
                <FaArrowRight
                  className="fa-arrow-right"
                  color="black"
                  fontSize={{ base: "1rem", md: "1.25rem" }}
                />
              </ChakraLink>
            </Flex>
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
};

export default LearnFromExperts;
