import React, { useRef, useEffect } from "react";
import { Box, Flex, Heading, Text, Img } from "@chakra-ui/react";
import OurMissionImg from "../../assets/mission-img.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OurMission = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const heading = container.querySelector("h2");
    const textContent = container.querySelector(".text-content");
    const image = container.querySelector(".mission-image");

    gsap.set([heading, textContent, image], {
      opacity: 0,
      y: 50,
    });

    ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      onEnter: () => {
        gsap.to(heading, { opacity: 1, y: 0, duration: 0.7 });
        gsap.to(textContent, { opacity: 1, y: 0, duration: 0.7, delay: 0.3 });
        gsap.to(image, {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.7,
          delay: 0.6,
          ease: "back.out(1.7)",
        });
      },
      once: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <Box ref={containerRef} mx={{ base: "1rem", md: "5rem", lg: "20rem" }}>
      <Heading
        as="h2"
        textAlign="center"
        color="var(--dark-blue)"
        mb="3rem"
        size={{ base: "md", md: "lg", lg: "xl" }}
      >
        Our mission
      </Heading>
      <Flex
        justifyContent="center"
        alignItems="center"
        mt={4}
        color="white"
        bg="var(--blue-gray)"
        borderRadius="12px"
        direction={{ base: "column", xl: "row" }}
        p={{ base: "1rem", md: "3rem" }}
      >
        <Flex
          className="text-content"
          direction="column"
          gap={2}
          fontWeight="light"
          flex="1"
        >
          <Text
            as="span"
            fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
            fontWeight="bold"
          >
            We help you make{" "}
            <Text
              as="span"
              color="var(--cyan)"
              textDecoration="underline white"
            >
              the first step
            </Text>
          </Text>
          <Text mt={4} fontSize={{ base: "md", md: "lg" }} textAlign="justify">
            It's been an amazing journey! JobConqueror was founded with the
            vision of creating a platform where job seekers and employers could
            easily connect. We wanted to be more than just a job board, offering
            a space where individuals could discover career opportunities,
            enhance their skills, and find the right job fit. <br />
            <br /> Today, JobConqueror boasts a thriving community of over
            30,000 active job seekers and more than 1,200 partner companies from
            various industries. Together, we've revolutionized the job search
            experience, making it easier for top talent to find their next
            career move. <br />
            <br /> We're proud of the impact we've made. JobConqueror is not
            just a platform; it's a community where careers are built. As we
            continue to grow, we're excited to lead the way in transforming the
            job market and making a difference. The future is promising, and
            we're eager to see what comes next!
          </Text>
        </Flex>
        <Img
          className="mission-image"
          src={OurMissionImg}
          alt="Mission Image"
          objectFit="cover"
          mt={{ base: "2rem", lg: 0 }}
          ml={{ base: 0, lg: 4 }}
          borderRadius="12px"
          maxW={{ base: "100%", lg: "40%" }}
        />
      </Flex>
    </Box>
  );
};

export default OurMission;
