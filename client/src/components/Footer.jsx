import axios from "axios";
import { useContext } from "react";
import {
  Box,
  chakra,
  Container,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  IconButton,
  useColorModeValue,
  Img,
} from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import NavLogo from "../assets/website_logo_bright.svg";
import { AuthContext } from "../contexts/AuthContext";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function Footer() {
  let currentYear = new Date().getFullYear();

  const { user } = useContext(AuthContext);

  const newsletterEmail = user ? user.email : "";

  const subscribeNewsletter = async () => {
    if (user) {
      try {
        await axios.post("/api/newsletter", { newsletterEmail });
      } catch (error) {
        console.error("Error subscribing to newsletter", error);
      }
    } else {
      console.log("User not logged in");
    }
  };

  return (
    <Box bg="var(--dark-blue)" color="white">
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <ChakraLink as={ReactRouterLink} to="/">
                <Img src={NavLogo} alt="Navigation Bar Logo" />
              </ChakraLink>
            </Box>
            <Text fontSize={"sm"}>
              © {currentYear} JobConqueror. All rights reserved
            </Text>
            <Stack direction={"row"} spacing={6}>
              <SocialButton label={"Twitter"} href={"#"}>
                <FaTwitter />
              </SocialButton>
              <SocialButton label={"YouTube"} href={"#"}>
                <FaYoutube />
              </SocialButton>
              <SocialButton label={"Instagram"} href={"#"}>
                <FaInstagram />
              </SocialButton>
              <SocialButton label={"LinkedIn"} href={"#"}>
                <FaLinkedinIn />
              </SocialButton>
            </Stack>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <ChakraLink as={ReactRouterLink} to="/who-we-are">
              Who We Are
            </ChakraLink>
            <ChakraLink as={ReactRouterLink} to="/contact-us">
              Contact Us
            </ChakraLink>

            <ChakraLink as={ReactRouterLink} to="/privacy-policy">
              Privacy Policy
            </ChakraLink>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Services</ListHeader>
            <ChakraLink as={ReactRouterLink} to="/company-overview">
              Companies Overview
            </ChakraLink>
            <ChakraLink as={ReactRouterLink} to="/job-listings">
              Job Listings
            </ChakraLink>
            <ChakraLink as={ReactRouterLink} to="/recommendations">
              Recommendations
            </ChakraLink>
            <ChakraLink as={ReactRouterLink} to="/blogs">
              Blogs
            </ChakraLink>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Stay up to date</ListHeader>
            <Stack direction={"row"}>
              <Input
                value={newsletterEmail}
                disabled
                placeholder={user ? "Your email address" : "Login to subscribe"}
                name="newsletterEmail"
                bg="var(--blue-gray)"
                border={0}
                _focus={{
                  bg: "whiteAlpha.300",
                }}
              />
              <IconButton
                onClick={subscribeNewsletter}
                bg="var(--light-blue)"
                color="var(--dark-blue)"
                _hover={{
                  bg: "var(--blue-gray)",
                  color: "var(--light-blue)",
                }}
                aria-label="Subscribe"
                icon={<BiMailSend />}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
