import { useContext } from "react";
import { Flex, VStack } from "@chakra-ui/react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { GrDocumentUser } from "react-icons/gr";
import { TbFileLike } from "react-icons/tb";
import { TbLogout2 } from "react-icons/tb";
import { PiFiles } from "react-icons/pi";
import { AuthContext } from "../contexts/AuthContext";

const sidebarLinks = [
  {
    icon: <CgProfile />,
    url: "/profile",
    title: "Profile",
  },
  {
    icon: <GrDocumentUser />,
    url: "/applications",
    title: "Applications",
  },
  {
    icon: <TbFileLike />,
    url: "/saved-jobs",
    title: "Saved jobs",
  },
  {
    icon: <PiFiles />,
    url: "/files",
    title: "Files",
  },
];

const ProfileSidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  return (
    <Flex
      bg="var(--blue-gray)"
      color="white"
      borderRadius="1rem"
      m="2rem 3.5rem"
      p="1rem 0"
    >
      <VStack align="flex-start" gap="2rem" pl="1rem">
        {sidebarLinks.map((link, index) => (
          <ChakraLink
            key={index}
            as={ReactRouterLink}
            to={link.url}
            _hover={{
              textDecoration: "none",
              backgroundColor: "var(--dark-blue)",
            }}
            p="1rem 2rem"
            w="100%"
            borderLeftRadius="0.75rem"
            bg={location.pathname === link.url ? "var(--dark-blue)" : "inherit"}
          >
            <Flex align="center" gap="1rem" fontSize="1.125rem">
              {link.icon} {link.title}
            </Flex>
          </ChakraLink>
        ))}
        <ChakraLink
          as={ReactRouterLink}
          to="/"
          onClick={logout}
          _hover={{
            textDecoration: "none",
            backgroundColor: "var(--dark-blue)",
          }}
          p="1rem 2rem"
          w="100%"
          borderLeftRadius="0.75rem"
        >
          <Flex align="center" gap="1rem" fontSize="1.125rem">
            <TbLogout2 /> Logout
          </Flex>
        </ChakraLink>
      </VStack>
    </Flex>
  );
};

export default ProfileSidebar;
