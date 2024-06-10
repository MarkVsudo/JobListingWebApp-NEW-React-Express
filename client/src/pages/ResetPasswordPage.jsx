import "../styles/AuthPages.css";
import { Helmet } from "react-helmet";
import {
  ChakraProvider,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Img,
} from "@chakra-ui/react";
import AuthButton from "../components/AuthButton";
import EllipseDesktop from "../assets/ellipse-svg-desktop.svg";
import EllipseTablet from "../assets/ellipse-svg-tablet.svg";
import EllipseMobile from "../assets/ellipse-svg-mobile.svg";
import { theme } from "../themes/InputTheme";

const ResetPasswordPage = () => {
  return (
    <ChakraProvider theme={theme}>
      <Flex
        p={{ base: "0 1rem", md: "2rem 2rem", lg: "0 5rem" }}
        color="var(--light-blue)"
        direction="column"
        overflow="hidden"
        alignItems={{ base: "center", md: "unset" }}
      >
        <Helmet>
          <title>JobConqueror - Reset Password</title>
        </Helmet>
        <Img
          src={EllipseDesktop}
          alt="Ellipse desktop svg"
          position="absolute"
          right="0"
          top="0"
          height="100%"
          width="50%"
          animation="shrinkAndEnlarge 1s ease-in-out"
          zIndex="5"
          display={{ base: "none", xl: "block" }}
        />

        <Img
          src={EllipseTablet}
          alt="Ellipse tablet svg"
          position="absolute"
          right="0"
          top="0"
          height="100%"
          width="50%"
          animation="shrinkAndEnlarge 1s ease-in-out"
          zIndex="5"
          display={{ base: "none", md: "block", xl: "none" }}
        />

        <Img
          src={EllipseMobile}
          alt="Ellipse mobile svg"
          position="absolute"
          left="0"
          bottom="0"
          height="max-content"
          width="100%"
          animation="shrinkAndEnlarge 1s ease-in-out"
          zIndex="5"
          display={{ base: "block", md: "none" }}
        />
        <Heading
          as="h1"
          size={{ base: "xl", md: "2xl", lg: "3xl" }}
          paddingBlock={{ base: "1rem 5rem", md: "1rem 8rem" }}
          fontWeight="600"
          textAlign={{ base: "center", md: "left" }}
        >
          Reset your password
        </Heading>
        <Flex
          direction="column"
          mt={8}
          maxW={{ base: "md", md: "sm", lg: "md" }}
          gap="1rem"
        >
          <FormControl variant="floating" id="password" isRequired>
            <Input
              type="password"
              placeholder=" "
              _focus={{ borderColor: "var(--cyan)" }}
            />
            <FormLabel>Password</FormLabel>
            <FormHelperText color="white">
              Be careful not to forget your password 😀
            </FormHelperText>
            <FormErrorMessage>Your password is invalid</FormErrorMessage>
          </FormControl>
          <FormControl variant="floating" id="confirmPassword" isRequired>
            <Input
              type="confirmPassword"
              placeholder=" "
              _focus={{ borderColor: "var(--cyan)" }}
            />
            <FormLabel>Confirmation Password</FormLabel>
            <FormErrorMessage>Your password is invalid</FormErrorMessage>
          </FormControl>
          <AuthButton
            title="Reset Password"
            onClick={() => console.log("Continue")}
          />
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default ResetPasswordPage;
