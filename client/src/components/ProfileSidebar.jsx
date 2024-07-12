import { useContext, useEffect, useState } from "react";
import axios from "axios";
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
import { MdOutlineLibraryAdd } from "react-icons/md";
import { AuthContext } from "../contexts/AuthContext";

const ProfileSidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const [verificationStatus, setVerificationStatus] = useState("not_submitted");

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      try {
        const response = await axios.get("/api/recruiter-verification");
        if (response.data.length > 0) {
          const { verified } = response.data[0];
          if (verified === 1) {
            setVerificationStatus("verified");
          } else if (verified === 0) {
            setVerificationStatus("awaiting");
          } else {
            setVerificationStatus("not_submitted");
          }
        } else {
          setVerificationStatus("not_submitted");
        }
      } catch (error) {
        console.error("Error fetching verification status:", error);
        setVerificationStatus("not_submitted");
      }
    };

    if (user) {
      fetchVerificationStatus();
    }
  }, [user]);

  const sidebarLinks = [
    {
      icon: <GoGitPullRequest fontSize="1.25rem" />,
      url: "/verification-review",
      title: "Requests",
      role: ["admin"],
    },
    {
      icon:
        verificationStatus === "verified" ? (
          <MdOutlineLibraryAdd fontSize="1.25rem" />
        ) : (
          <MdOutlineVerified fontSize="1.25rem" />
        ),
      url:
        verificationStatus === "verified"
          ? "/post-job-offer"
          : "/recruiter-verification",
      title: verificationStatus === "verified" ? "Post a job" : "Verification",
      role: ["recruiter", "admin"],
    },
    {
      icon: <CgProfile fontSize="1.25rem" />,
      url: "/profile",
      title: "Profile",
      role: ["applicant", "recruiter", "admin"],
    },
    {
      icon: <GrDocumentUser fontSize="1.125rem" />,
      url: "/applications",
      title: "Applications",
      role: ["applicant", "recruiter", "admin"],
    },
    {
      icon: <TbFileLike fontSize="1.25rem" />,
      url: "/saved-jobs",
      title: "Saved jobs",
      role: ["applicant", "recruiter", "admin"],
    },
    {
      icon: <PiFiles fontSize="1.25rem" />,
      url: "/files",
      title: "Files",
      role: ["applicant", "recruiter", "admin"],
    },
  ];

  if (!user) {
    return "Loading...";
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
