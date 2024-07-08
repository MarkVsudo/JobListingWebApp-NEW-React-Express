import { useContext } from "react";
import { Flex, VStack } from "@chakra-ui/react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { GrDocumentUser } from "react-icons/gr";
import { TbFileLike } from "react-icons/tb";
import { TbLogout2 } from "react-icons/tb";
import { PiFiles } from "react-icons/pi";
import { MdOutlineVerified } from "react-icons/md";
import { GoGitPullRequest } from "react-icons/go";
import { AuthContext } from "../contexts/AuthContext";

const sidebarLinks = [
  {
    icon: <GoGitPullRequest />,
    url: "/verification-review",
    title: "Requests",
    role: ["admin"],
  },
  {
    icon: <MdOutlineVerified />,
    url: "/recruiter-verification",
    title: "Verification",
    role: ["recruiter", "admin"],
  },
  {
    icon: <CgProfile />,
    url: "/profile",
    title: "Profile",
    role: ["applicant", "recruiter", "admin"],
  },
  {
    icon: <GrDocumentUser />,
    url: "/applications",
    title: "Applications",
    role: ["applicant", "recruiter", "admin"],
  },
  {
    icon: <TbFileLike />,
    url: "/saved-jobs",
    title: "Saved jobs",
    role: ["applicant", "recruiter", "admin"],
  },
  {
    icon: <PiFiles />,
    url: "/files",
    title: "Files",
    role: ["applicant", "recruiter", "admin"],
  },
];

const ProfileSidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    return "Loading";
  }

  let allowedSidebarLinksApplicant = sidebarLinks.filter((sidebarLink) =>
    sidebarLink.role.includes("applicant")
  );

  let allowedSidebarLinksRecruiter = sidebarLinks.filter((sidebarLink) =>
    sidebarLink.role.includes("recruiter")
  );

  let userAllowedLinks =
    user.role === "applicant"
      ? allowedSidebarLinksApplicant
      : user.role === "recruiter"
      ? allowedSidebarLinksRecruiter
      : sidebarLinks;

  return (
    <Flex
      bg="var(--blue-gray)"
      color="white"
      borderRadius="1rem"
      ml="3.5rem"
      p="1rem 0"
    >
      <VStack align="flex-start" gap="2rem" pl="1rem">
        {userAllowedLinks.map((link, index) => (
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
