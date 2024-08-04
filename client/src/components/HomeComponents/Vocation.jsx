import { useRef, useEffect, useState } from "react";
import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  VStack,
  Img,
  ChakraProvider,
  Box,
} from "@chakra-ui/react";
import VocationImg from "../../assets/vocation-img.png";
import { theme } from "../../themes/InputTheme";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Vocation = () => {
  const containerRef = useRef(null);
  const [fileName, setFileName] = useState("");

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex
        ref={containerRef}
        m={{
          base: "3rem 1rem ",
          md: "5rem",
          lg: "10rem 20rem",
        }}
        bg="var(--blue-gray)"
        borderRadius="12px"
        color="white"
        boxShadow={{ base: "none", md: "20px -20px var(--dark-blue)" }}
        direction="column"
      >
        <Flex
          gap={{ base: "2rem", md: "3rem", lg: "5rem" }}
          p={{ base: "1rem", md: "2rem", lg: "2.5rem", xl: "4rem" }}
          align={{ base: "stretch", lg: "center" }}
          direction={{ base: "column", xl: "row" }}
        >
          <VStack spacing={5} flex="1" align="stretch">
            <Heading
              as="h1"
              fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
              fontWeight="bold"
              textAlign={{ base: "center", lg: "left" }}
            >
              Haven't discovered your vocation yet?
            </Heading>
            <form
              onSubmit={handleSubmit}
              action="/api/emailResume"
              method="post"
              encType="multipart/form-data"
            >
              <Text
                className="description"
                textAlign="justify"
                mb={5}
                fontSize={{ base: "sm", md: "md" }}
              >
                Send us a resume with which we can decide which job suits your
                persona. Your resume is a key tool in helping us understand your
                professional background, skills, and experience. Additionally,
                feel free to include a cover letter highlighting your career
                goals and any specific achievements that showcase your
                qualifications for the desired position. We look forward to
                getting to know you better and finding the perfect match for
                your career aspirations.
              </Text>
              <VStack spacing={5} align="stretch">
                <Flex
                  gap="1rem"
                  direction={{ base: "column", md: "row" }}
                  align="flex-end"
                >
                  <FormControl
                    variant="floating"
                    id="email"
                    isRequired
                    width="full"
                  >
                    <Input type="email" name="email" placeholder=" " />
                    <FormLabel>Email address</FormLabel>
                  </FormControl>

                  <FormControl id="resume" isRequired width="full">
                    <FormLabel>Upload Resume (.doc(x)/.rtf/.pdf)</FormLabel>
                    <Input
                      value={fileName}
                      isReadOnly
                      border="1px solid var(--cyan)"
                      placeholder="No file chosen"
                    />
                    <Input
                      type="file"
                      id="fileInput"
                      name="resume"
                      accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </FormControl>

                  <Button
                    width={{ base: "full", md: "sm" }}
                    paddingInline="2rem"
                    fontWeight="500"
                    backgroundColor="var(--cyan)"
                    color="white"
                    _hover={{
                      bg: "#00909A",
                    }}
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    Choose a file
                  </Button>
                </Flex>

                <Button
                  type="submit"
                  width="full"
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
              </VStack>
            </form>
          </VStack>

          <Box display="flex" justifyContent="center">
            <Img
              className="vocation-image"
              src={VocationImg}
              alt="Vocation Image"
              width={{ base: "100%", md: "80%", lg: "auto" }}
              maxHeight={{ base: "300px", lg: "auto" }}
              objectFit="contain"
            />
          </Box>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default Vocation;
