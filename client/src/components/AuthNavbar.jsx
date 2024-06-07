import { Flex, Img } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import AuthNavbarLogo from "../assets/website_logo_bright.svg";

const AuthNavbar = () => {
  return (
    <Flex p={{ base: "1rem 5rem", md: "1rem 2rem", lg: "1rem 5rem" }}>
      <ChakraLink as={ReactRouterLink} to="/">
        <Img src={AuthNavbarLogo} alt="Navigation bar logo" />
      </ChakraLink>
    </Flex>
  );
};

export default AuthNavbar;
