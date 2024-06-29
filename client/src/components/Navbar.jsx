import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  Center,
  MenuDivider,
  MenuItem,
  Img,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { useContext } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { RxDashboard } from "react-icons/rx";
import { TbLogout2 } from "react-icons/tb";
import NavLogo from "../assets/website_logo.svg";
import { AuthContext } from "../contexts/AuthContext";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();

  const { user, logout } = useContext(AuthContext);

  return (
    <Box>
      <Flex
        color="var(--dark-blue)"
        minH={"60px"}
        py={{ base: 2, xl: "1rem" }}
        px={{ base: 4, xl: "3.5rem" }}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <ChakraLink as={ReactRouterLink} to="/">
            <Img src={NavLogo} alt="Navigation Bar Logo" />
          </ChakraLink>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
          align="center"
        >
          {user ? (
            <Stack direction={"row"} spacing={7}>
              <ChakraLink
                as={ReactRouterLink}
                to={
                  user && user.role === "recruiter"
                    ? "/profile"
                    : "/job-listings"
                }
                align="center"
              >
                <Button
                  bg="var(--blue-gray)"
                  color="white"
                  _hover={{ backgroundColor: "var(--dark-blue)" }}
                >
                  {user && user.role === "recruiter"
                    ? "Post Jobs"
                    : "Find Jobs"}
                </Button>
              </ChakraLink>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      user && user.avatarUrl
                        ? user.avatarUrl
                        : "https://static-00.iconduck.com/assets.00/user-avatar-happy-icon-2048x2048-ssmbv1ou.png"
                    }
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={
                        user && user.avatarUrl
                          ? user.avatarUrl
                          : "https://static-00.iconduck.com/assets.00/user-avatar-happy-icon-2048x2048-ssmbv1ou.png"
                      }
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{user ? user.fullName : "Username"}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <ChakraLink
                    as={ReactRouterLink}
                    to="/profile"
                    align="center"
                    _hover={{ textDecoration: "none" }}
                  >
                    <MenuItem gap=".5rem">
                      <RxDashboard />
                      Profile
                    </MenuItem>
                  </ChakraLink>
                  <MenuItem gap=".5rem" onClick={logout}>
                    <TbLogout2 />
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          ) : (
            <>
              <ChakraLink as={ReactRouterLink} to="/login" align="center">
                <Button
                  as="a"
                  fontSize="sm"
                  fontWeight={400}
                  variant="link"
                  href="#"
                >
                  Sign In
                </Button>
              </ChakraLink>
              <ChakraLink
                as={ReactRouterLink}
                to="/register"
                _hover={{ textDecoration: "none" }}
              >
                <Button
                  as="a"
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize="sm"
                  fontWeight={600}
                  color="white"
                  bg="var(--dark-blue)"
                  href="#"
                  _hover={{
                    bg: "var(--blue-gray)",
                  }}
                >
                  Sign Up
                </Button>
              </ChakraLink>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4} align="center">
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={".9rem"}
                fontWeight={500}
                color="var(--dark-blue)"
                _hover={{
                  textDecoration: "none",
                  color: "var(--cyan)",
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: "var(--light-blue)" }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "var(--blue-gray)" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color="var(--blue-gray)" w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Inspiration",
    children: [
      {
        label: "Recommendations",
        subLabel: "Learn the skills you need",
        href: "/recommendations",
      },
      {
        label: "Blog",
        subLabel: "Career tips and advice",
        href: "/blog",
      },
    ],
  },
  {
    label: "Find Work",
    children: [
      {
        label: "Job Board",
        subLabel: "Find your dream job",
        href: "/job-listings",
      },
      {
        label: "Companies",
        subLabel: "Find hiring companies",
        href: "/company-overview",
      },
    ],
  },
  {
    label: "Who we are",
    href: "/who-we-are",
  },
];
