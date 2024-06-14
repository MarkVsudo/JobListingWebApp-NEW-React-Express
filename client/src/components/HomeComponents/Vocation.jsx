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

const Vocation = () => {
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.target);
      const response = await fetch("/api/emailResume", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "Email sent successfully",
          description: "We will review your resume shortly.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        event.target.reset();
      } else {
        throw new Error("Failed to send email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Failed to send email",
        description: "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex
        m="10rem 20rem"
        bg="var(--blue-gray)"
        borderRadius="12px"
        color="white"
        boxShadow="20px -20px var(--dark-blue)"
      >
        <Flex gap="5rem" p={10} align="center">
          <VStack spacing={5} flex="1" align="stretch">
            <Heading as="h1" size="xl" fontWeight="bold">
              Haven’t discovered your vocation yet?
            </Heading>
            <form
              onSubmit={handleSubmit}
              action="/api/emailResume"
              method="post"
              encType="multipart/form-data"
            >
              <Text textAlign="justify" mb={5}>
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

          <Img src={VocationImg} alt="Vocation Image" />
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default Vocation;
