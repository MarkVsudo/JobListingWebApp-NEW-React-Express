import "../styles/AuthPages.css";
import { useRef } from "react";
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
  extendTheme,
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
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import AuthButton from "../components/AuthButton";
import EllipseDesktop from "../assets/ellipse-svg-desktop.svg";
import EllipseTablet from "../assets/ellipse-svg-tablet.svg";
import EllipseMobile from "../assets/ellipse-svg-mobile.svg";

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
};

export const theme = extendTheme({
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top",
            },
          },
        },
      },
    },
  },
});

const LoginPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  return (
    <ChakraProvider theme={theme}>
      <Flex
        px="5rem"
        color="var(--light-blue)"
        direction="column"
        overflow="hidden"
      >
        <Helmet>
          <title>JobConqueror - Login</title>
        </Helmet>
        <Img
          src={EllipseDesktop}
          alt="Ellipse desktop svg"
          style={{
            position: "absolute",
            right: "0",
            top: "0",
            height: "100vh",
            width: "50%",
            animation: "shrinkAndEnlarge 1s ease-in-out",
            zIndex: "5",
          }}
        />
        <Heading
          as="h1"
          size="3xl"
          noOfLines={1}
          paddingBlock="1rem 8rem"
          fontWeight="600"
        >
          Sign in to your account
        </Heading>
        <Flex direction="column" mt={8} maxW="md" gap="1rem">
          <FormControl variant="floating" id="email" isRequired>
            <Input
              type="email"
              placeholder=" "
              _focus={{ borderColor: "var(--cyan)" }}
            />
            <FormLabel>Email address</FormLabel>
            <FormHelperText color="white">
              We'll never share your email.
            </FormHelperText>
            <FormErrorMessage>Your email is invalid</FormErrorMessage>
          </FormControl>
          <FormControl variant="floating" id="password" isRequired>
            <Input
              type="password"
              placeholder=" "
              _focus={{ borderColor: "var(--cyan)" }}
            />
            <FormLabel>Password</FormLabel>

            <FormHelperText color="white">
              Your password must be 8-20 characters long, contain letters and
              numbers, and must not contain spaces, special characters, or
              emoji.
            </FormHelperText>
            <Button
              style={{ all: "unset", cursor: "pointer" }}
              onClick={onOpen}
            >
              Forgot your password?
            </Button>
            <FormErrorMessage>Your password is invalid</FormErrorMessage>
          </FormControl>
          <Checkbox defaultChecked>Stay signed in (30 days)</Checkbox>
          <AuthButton
            title="Continue"
            onClick={() => console.log("Continue")}
          />
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
            <ModalHeader>Reset password</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={3}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="email@example.com"
                  required
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3}>
                Send reset email
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
