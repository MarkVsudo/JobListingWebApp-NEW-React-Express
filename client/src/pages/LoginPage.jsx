import { Helmet } from "react-helmet";
import {
  ChakraProvider,
  Box,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  extendTheme,
} from "@chakra-ui/react";

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
              backgroundColor: "white",
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
  return (
    <ChakraProvider theme={theme}>
      <Box px="3rem" color="var(--light-blue)">
        <Helmet>
          <title>JobConqueror - Login</title>
        </Helmet>
        <Heading as="h1" size="4xl" noOfLines={1}>
          Sign in to your account
        </Heading>
        <Flex direction="column" mt={8} maxW="md" mx="auto">
          <FormControl variant="floating" id="email" isRequired>
            <Input type="email" placeholder=" " />
            <FormLabel>Email address</FormLabel>
            <FormHelperText>We'll never share your email.</FormHelperText>
            <FormErrorMessage>Your email is invalid</FormErrorMessage>
          </FormControl>
          <FormControl variant="floating" id="password" isRequired mt={6}>
            <Input type="password" placeholder=" " />
            <FormLabel>Password</FormLabel>
            <FormHelperText>Make sure your password is strong.</FormHelperText>
            <FormErrorMessage>Your password is invalid</FormErrorMessage>
          </FormControl>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default LoginPage;
