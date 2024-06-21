import React, { useState } from "react";
import { Helmet } from "react-helmet";
import {
  ChakraProvider,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Text,
  Checkbox,
  Img,
  useToast,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import AuthButton from "../components/AuthButton";
import EllipseDesktop from "../assets/ellipse-svg-desktop.svg";
import EllipseTablet from "../assets/ellipse-svg-tablet.svg";
import EllipseMobile from "../assets/ellipse-svg-mobile.svg";
import { theme } from "../themes/InputTheme";
import axios from "axios";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "applicant",
    subscribed: true,
  });

  const { username, email, password, role, subscribed } = formData;

  const toast = useToast();
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (name === "role") {
      setFormData({
        ...formData,
        role: checked ? "recruiter" : "applicant",
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/register", formData);
      toast({
        title: "Account created.",
        description: res.data.msg,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
    } catch (err) {
      console.error("Error:", err);
      let errorMsg = "An unexpected error occurred";
      if (err.response?.data?.errors) {
        errorMsg = err.response.data.errors[0].msg; // Get the first error message
      } else if (err.response?.data?.msg) {
        errorMsg = err.response.data.msg;
      }
      toast({
        title: "Error",
        description: errorMsg,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
          <title>JobConqueror - Register</title>
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
          paddingBlock={{ base: " 0", md: "1rem 8rem" }}
          fontWeight="600"
          textAlign={{ base: "center", md: "left" }}
        >
          Create your account
        </Heading>
        <Flex
          as="form"
          direction="column"
          mt={8}
          maxW={{ base: "md", md: "sm", lg: "md" }}
          gap="1rem"
          onSubmit={onSubmit}
        >
          <FormControl variant="floating" id="email" isRequired>
            <Input
              type="email"
              placeholder=" "
              name="email"
              value={email}
              onChange={onChange}
              _focus={{ borderColor: "var(--cyan)" }}
            />
            <FormLabel>Email address</FormLabel>
            <FormHelperText color="white">
              We'll never share your email.
            </FormHelperText>
            <FormErrorMessage>Your email is invalid</FormErrorMessage>
          </FormControl>
          <FormControl variant="floating" id="username" isRequired>
            <Input
              type="text"
              placeholder=" "
              name="username"
              value={username}
              onChange={onChange}
              _focus={{ borderColor: "var(--cyan)" }}
            />
            <FormLabel>Full name</FormLabel>
            <FormErrorMessage>Your name is invalid</FormErrorMessage>
          </FormControl>
          <FormControl variant="floating" id="password" isRequired>
            <Input
              type="password"
              placeholder=" "
              name="password"
              value={password}
              onChange={onChange}
              _focus={{ borderColor: "var(--cyan)" }}
            />
            <FormLabel>Password</FormLabel>
            <FormHelperText color="white">
              Your password must be 8-20 characters long, contain letters and
              numbers, and must not contain spaces, special characters, or
              emoji.
            </FormHelperText>
            <FormErrorMessage>Your password is invalid</FormErrorMessage>
          </FormControl>
          <Checkbox name="role" value="applicant" onChange={onChange}>
            Register as recruiter?
          </Checkbox>
          <Checkbox
            name="subscribed"
            isChecked={subscribed}
            onChange={onChange}
          >
            Email me about job offers and news. If this box is checked,
            JobConqueror will occasionally send helpful and relevant emails. You
            can unsubscribe at any time.{" "}
            <ChakraLink
              as={ReactRouterLink}
              to="/"
              _hover={{ textDecoration: "none" }}
              style={{
                fontWeight: "500",
                color: "white",
              }}
            >
              Privacy Policy
            </ChakraLink>
          </Checkbox>
          <AuthButton title="Create account" onClick={onSubmit} />
          <Text>
            Already have an account?
            <ChakraLink
              as={ReactRouterLink}
              to="/login"
              _hover={{ textDecoration: "none" }}
              style={{
                fontWeight: "500",
                color: "white",
              }}
            >
              {" "}
              Sign in
            </ChakraLink>
          </Text>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default RegisterPage;
