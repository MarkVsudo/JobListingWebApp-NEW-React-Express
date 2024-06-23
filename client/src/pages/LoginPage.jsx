import "../styles/AuthPages.css";
import { useState, useContext } from "react";
import { useRef } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import {
  ChakraProvider,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Checkbox,
  Img,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import AuthButton from "../components/AuthButton";
import EllipseDesktop from "../assets/ellipse-svg-desktop.svg";
import EllipseTablet from "../assets/ellipse-svg-tablet.svg";
import EllipseMobile from "../assets/ellipse-svg-mobile.svg";
import { theme } from "../themes/InputTheme";
import { AuthContext } from "../contexts/AuthContext";

const LoginPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [jwtExpiration, setJwtExpiration] = useState(undefined);
  const [errors, setErrors] = useState({});
  const [resetErrors, setResetErrors] = useState({});
  const [resetEmail, setResetEmail] = useState("");
  const navigate = useNavigate();

  const { setToken } = useContext(AuthContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/login", {
        email,
        password,
        jwtExpiration,
      });

      localStorage.setItem("token", response.data.token);

      setToken(response.data.token); // Update auth context with new token

      navigate("/");
    } catch (err) {
      console.error("Error:", err);
      const validationErrors = {};
      if (err.response) {
        if (err.response.data.errors) {
          // Handling validation errors
          err.response.data.errors.forEach((error) => {
            validationErrors[error.path] = error.msg;
          });
        } else if (err.response.data.msg) {
          // Handling general error messages
          validationErrors.msg = err.response.data.msg;
        }
      }
      setErrors(validationErrors);
    }
  };

  const onSubmitResetModal = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/reset-password", { resetEmail });
    } catch (err) {
      console.error("Error:", err);
      const validationErrors = {};
      if (err.response) {
        if (err.response.data.resetErrors) {
          // Handling validation errors
          err.response.data.resetErrors.forEach((error) => {
            validationErrors[error.path] = error.msg;
          });
        } else if (err.response.data.msg) {
          // Handling general error messages
          validationErrors.msg = err.response.data.msg;
        }
      }
      setResetErrors(validationErrors);
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
          <title>JobConqueror - Login</title>
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
          Sign in to your account
        </Heading>
        <Flex
          as="form"
          direction="column"
          mt={8}
          maxW={{ base: "md", md: "sm", lg: "md" }}
          gap="1rem"
          onSubmit={onSubmit}
        >
          <FormControl
            variant="floating"
            id="email"
            isRequired
            isInvalid={errors.email}
          >
            <Input
              type="email"
              placeholder=" "
              _focus={{ borderColor: "var(--cyan)" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel>Email address</FormLabel>
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl
            variant="floating"
            id="password"
            isRequired
            isInvalid={errors.password}
          >
            <Input
              type="password"
              placeholder=" "
              _focus={{ borderColor: "var(--cyan)" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormLabel>Password</FormLabel>
            <FormErrorMessage>{errors.password}</FormErrorMessage>
            <Button
              style={{ all: "unset", cursor: "pointer" }}
              onClick={onOpen}
            >
              Forgot your password?
            </Button>
          </FormControl>
          {errors.msg && <Text color="red.500">{errors.msg}</Text>}
          <Checkbox
            onChange={(e) => setJwtExpiration(e.target.checked && 2592000)}
          >
            Stay signed in (30 days)
          </Checkbox>

          <AuthButton title="Continue" onClick={onSubmit} />
          <Text>
            Don't have an account?
            <ChakraLink
              as={ReactRouterLink}
              to="/register"
              _hover={{ textDecoration: "none" }}
              style={{
                fontWeight: "500",
                color: "white",
              }}
            >
              {" "}
              Sign up
            </ChakraLink>
          </Text>
        </Flex>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader pb={0}>Reset password</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={3}>
              <Text pb={2}>You'll get an email with a reset link</Text>
              <FormControl id="resetEmail" isInvalid={resetErrors.resetEmail}>
                <FormLabel>Email</FormLabel>
                <Input
                  ref={initialRef}
                  name="resetEmail"
                  placeholder="email@example.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
                <FormErrorMessage>{resetErrors.resetEmail}</FormErrorMessage>
              </FormControl>
              {resetErrors.msg && (
                <Text color="red.500">{resetErrors.msg}</Text>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onSubmitResetModal}>
                Request Reset
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </ChakraProvider>
  );
};

export default LoginPage;
