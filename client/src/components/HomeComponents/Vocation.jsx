import React, { useRef, useEffect } from "react";
import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  VStack,
  HStack,
  Img,
  ChakraProvider,
  useToast,
} from "@chakra-ui/react";
import VocationImg from "../../assets/vocation-img.png";
import { theme } from "../../themes/InputTheme";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Vocation = () => {
  const toast = useToast();
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const heading = container.querySelector("h1");
    const text = container.querySelector(".description");
    const form = container.querySelector("form");
    const image = container.querySelector(".vocation-image");

    gsap.set(container, { opacity: 0, y: 100 });
    gsap.set([heading, text, form, image], { opacity: 0, y: 50 });

    ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      onEnter: () => {
        gsap.to(container, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        });
        gsap.to(heading, { opacity: 1, y: 0, duration: 0.7, delay: 0.3 });
        gsap.to(text, { opacity: 1, y: 0, duration: 0.7, delay: 0.5 });
        gsap.to(form, { opacity: 1, y: 0, duration: 0.7, delay: 0.7 });
        gsap.to(image, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.9,
          ease: "back.out(1.7)",
        });
      },
      once: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleSubmit = async (event) => {
    // ... (keep the existing handleSubmit function)
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex
        ref={containerRef}
        m="10rem 20rem"
        bg="var(--blue-gray)"
        borderRadius="12px"
        color="white"
        boxShadow="20px -20px var(--dark-blue)"
      >
        <Flex gap="5rem" p={10} align="center">
          <VStack spacing={5} flex="1" align="stretch">
            <Heading as="h1" size="xl" fontWeight="bold">
              Haven't discovered your vocation yet?
            </Heading>
            <form
              onSubmit={handleSubmit}
              action="/api/emailResume"
              method="post"
              encType="multipart/form-data"
            >
              <Text className="description" textAlign="justify" mb={5}>
                Send us a resume with which we can decide which job suits your
                persona. Your resume is a key tool in helping us understand your
                professional background, skills, and experience. Additionally,
                feel free to include a cover letter highlighting your career
                goals and any specific achievements that showcase your
                qualifications for the desired position. We look forward to
                getting to know you better and finding the perfect match for
                your career aspirations.
              </Text>
              <HStack spacing={5} align="stretch">
                <FormControl variant="floating" id="email" isRequired>
                  <Input type="email" name="email" placeholder=" " />
                  <FormLabel>Email address</FormLabel>
                </FormControl>
                <FormControl variant="floating" id="resume" isRequired>
                  <Input
                    type="file"
                    name="resume"
                    accept=".doc, .docx, .rtf, .pdf"
                    pt="3px"
                  />
                </FormControl>
                <FormLabel htmlFor="resume">
                  Upload Resume (.doc(x)/.rtf/.pdf)
                </FormLabel>
              </HStack>
              <Button
                type="submit"
                width="max-content"
                paddingInline="2rem"
                fontWeight="500"
                backgroundColor="var(--cyan)"
                color="white"
                _hover={{
                  bg: "#00909A",
                }}
              >
                Send email
              </Button>
            </form>
          </VStack>

          <Img
            className="vocation-image"
            src={VocationImg}
            alt="Vocation Image"
          />
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default Vocation;
