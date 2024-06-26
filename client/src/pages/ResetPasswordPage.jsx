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
  Text,
  Img,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import AuthButton from "../components/AuthButton";
import EllipseDesktop from "../assets/ellipse-svg-desktop.svg";
import EllipseTablet from "../assets/ellipse-svg-tablet.svg";
import EllipseMobile from "../assets/ellipse-svg-mobile.svg";
import { theme } from "../themes/InputTheme";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resetErrors, setResetErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/confirm-password-reset", {
        token,
        newPassword,
        confirmPassword,
      });
      setSuccessMessage(response.data.msg);
      setErrorMessage("");
    } catch (err) {
      console.error("Error:", err);
      const validationErrors = {};
      if (err.response && err.response.data) {
        if (err.response.data.resetErrors) {
          // Handling validation errors
          err.response.data.resetErrors.forEach((error) => {
            validationErrors[error.path] = error.msg;
          });
        } else if (err.response.data.msg) {
          // Handling general error messages
          setErrorMessage(err.response.data.msg);
        }
      }
      setResetErrors(validationErrors);
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        window.close();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

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
          as="form"
          onSubmit={handleSubmit}
        >
          <FormControl
            variant="floating"
            id="password"
            required
            isInvalid={resetErrors.newPassword}
          >
            <Input
              type="password"
              placeholder=" "
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              _focus={{ borderColor: "var(--cyan)" }}
            />
            <FormLabel>Password</FormLabel>
            <FormHelperText color="white">
              Be careful not to forget your password 😀
            </FormHelperText>
            <FormErrorMessage>{resetErrors.newPassword}</FormErrorMessage>
          </FormControl>
          <FormControl
            variant="floating"
            id="confirmPassword"
            required
            isInvalid={resetErrors.confirmPassword}
          >
            <Input
              type="password"
              placeholder=" "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              _focus={{ borderColor: "var(--cyan)" }}
            />
            <FormLabel>Confirmation Password</FormLabel>
            <FormErrorMessage>{resetErrors.confirmPassword}</FormErrorMessage>
          </FormControl>
          {successMessage ? (
            <Text color="green.500">{successMessage}</Text>
          ) : (
            errorMessage && (
              <Text color="red.500" fontSize="0.875rem">
                {errorMessage}
              </Text>
            )
          )}
          <AuthButton title="Reset Password" onClick={handleSubmit} />
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default ResetPasswordPage;
