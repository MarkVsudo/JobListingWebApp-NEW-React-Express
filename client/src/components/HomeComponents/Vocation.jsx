import {
  Box,
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
} from "@chakra-ui/react";
import VocationImg from "../../assets/vocation-img.png";
import { theme } from "../../themes/InputTheme";

const Vocation = () => {
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
              action="/form/process"
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
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" name="email" />
                </FormControl>
                <FormControl variant="floating" id="resume" isRequired>
                  <Input
                    type="file"
                    name="resume"
                    accept=".doc, .docx, .rtf ,.pdf"
                    pt="3px"
                  />
                </FormControl>
                <FormLabel>Upload Resume (.doc(x)/.rtf/.pdf)</FormLabel>
              </HStack>
              <Button
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
