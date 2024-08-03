import { useRef, useEffect } from "react";
import { Img, Flex, Text, Box } from "@chakra-ui/react";
import ProcessImg from "../../assets/process_svg.svg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let processData = [
  {
    count: "1",
    title: "Job apply",
    text: "Choose a job according to your preferences. Make sure you can meet the requirements and already understand how the job is chosen.",
  },
  {
    count: "2",
    title: "Candidate selection",
    text: "Choose a job according to your preferences. Make sure you can meet the requirements and already understand how the job is chosen.",
  },
  {
    count: "3",
    title: "Interview",
    text: "Choose a job according to your preferences. Make sure you can meet the requirements and already understand how the job is chosen.",
  },
];

const Process = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const stepElementSt = container.querySelector(".step-1");
    const stepElementNd = container.querySelector(".step-2");
    const stepElementRd = container.querySelector(".step-3");

    gsap.set([stepElementSt, stepElementNd, stepElementRd], {
      opacity: 0,
      x: 50,
    });

    ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      onEnter: () => {
        gsap.to(stepElementRd, { opacity: 1, x: 0, duration: 0.4 });
        gsap.to(stepElementNd, { opacity: 1, x: 0, duration: 0.4, delay: 0.4 });
        gsap.to(stepElementSt, { opacity: 1, x: 0, duration: 0.4, delay: 0.8 });
      },
      once: true,
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <Box
      ref={containerRef}
      bg="var(--blue-gray)"
      borderRadius="12px"
      my={{ base: "5rem", lg: "7rem", xl: "10rem" }}
      w={{
        base: "20rem",
        sm: "35rem",
        md: "37rem",
        lg: "50rem",
        xl: "72rem",
        "2xl": "81.5rem",
      }}
      mx="auto"
      position="relative"
      overflow={{ base: "hidden", lg: "visible" }}
    >
      <Flex
        p={{ base: "2rem", md: "3rem" }}
        justify={{ base: "flex-start", lg: "center" }}
        align="center"
        transform={{
          lg: "translateX(-4.5rem)",
          xl: "translateX(-7.5rem)",
          "2xl": "translateX(-17rem)",
        }}
        overflowX={{ base: "auto", lg: "visible" }}
        gap={{ base: "2rem", lg: "4rem", xl: "3rem", "2xl": "5rem" }}
        minW={{ lg: "max-content" }}
      >
        {processData.map((step, index) => (
          <Flex
            key={index}
            className={`step-${step.count}`}
            direction="column"
            p="1rem"
            h="max-content"
            w="15rem"
            minW="15rem"
            gap="0.5rem"
            bg="white"
            boxShadow="var(--box-shadow)"
            borderRadius="12px"
            zIndex={1}
          >
            <Flex
              justifyContent="center"
              alignItems="center"
              bg="var(--cyan)"
              borderRadius="12px"
              w="3rem"
              h="3rem"
            >
              <Text fontWeight={700} color="white" fontSize="1.25rem">
                {step.count}
              </Text>
            </Flex>
            <Text color="black" fontWeight={700} fontSize="1.25rem">
              {step.title}
            </Text>
            <Text color="black" opacity="0.8">
              {step.text}
            </Text>
          </Flex>
        ))}
      </Flex>
      <Img
        src={ProcessImg}
        alt="Process image"
        position="absolute"
        bottom="0"
        right={{ xl: "0", "2xl": "2rem" }}
        h={{ xl: "115%", "2xl": "125%" }}
        display={{ base: "none", xl: "block" }}
        maxW="100%"
        zIndex={0}
      />
    </Box>
  );
};

export default Process;
