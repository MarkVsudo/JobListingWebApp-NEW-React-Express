import { Helmet } from "react-helmet";
import { useState } from "react";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import { SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";
import HomeButton from "../components/HomeComponents/HomeButton";

const rectangleHeaderStyles = {
  width: "50px",
  height: "300px",
  position: "absolute",
};

const filterButtonStyles = {
  bg: "var(--light-blue)",
  color: "black",
  _hover: {
    bg: "var(--blue-gray)",
    color: "white",
  },
  _active: {
    bg: "var(--blue-gray)",
    color: "white",
  },
};

const JobListingsPage = () => {
  const recentSearches = [
    "Web Developer",
    "Financial Analyst",
    "UX/UI Designer",
    "Customer Support Specialist",
    "Marketing Coordinator",
  ];

  return (
    <>
      <Helmet>
        <title>JobConqueror - Job Board</title>
      </Helmet>
      {/* Header */}
      <Flex
        pos="relative"
        overflow="hidden"
        w="100%"
        h="max-content"
        p="3rem 5rem"
        bg="var(--blue-gray)"
        color="white"
      >
        <Flex direction="column" gap=".5rem" alignContent="center">
          <Text as="h1" fontSize="1.5rem" fontWeight={600}>
            Find your dream job
          </Text>
          <Text as="span" fontWeight={300}>
            Looking for jobs? Browse our latest job openings
          </Text>
        </Flex>
        <Box
          {...rectangleHeaderStyles}
          bg="var(--dark-blue)"
          top="1rem"
          right="5rem"
          transform="rotate(70deg)"
        />
        <Box
          {...rectangleHeaderStyles}
          bg="var(--light-blue)"
          top="-7rem"
          right="-8rem"
          transform="rotate(80deg)"
        />
        <Box
          {...rectangleHeaderStyles}
          bg="var(--cyan)"
          top="-12rem"
          right="7rem"
          transform="rotate(30deg)"
        />
        <Box
          {...rectangleHeaderStyles}
          bg="var(--dark-blue)"
          top="-3rem"
          right="17rem"
          transform="rotate(-40deg)"
        />
        <Box
          {...rectangleHeaderStyles}
          bg="var(--light-blue)"
          top="5rem"
          right="28rem"
          transform="rotate(30deg)"
        />
        <Box
          {...rectangleHeaderStyles}
          bg="var(--cyan)"
          top="-10rem"
          right="33rem"
          transform="rotate(70deg)"
        />
      </Flex>
      {/* Search Filters */}
      <Flex
        bg="white"
        w="100%"
        padding="1rem 5rem"
        alignItems="center"
        justifyContent="space-between"
      >
        <Popover>
          <InputGroup gap="0.5rem">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <PopoverTrigger>
              <Input type="text" placeholder="Search jobs..." />
            </PopoverTrigger>
            {/* <datalist id="datalistOptions">
              {recentSearches.map((search, index) => (
                <option key={index} value={search} />
              ))}
            </datalist> */}
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Confirmation!</PopoverHeader>
              <PopoverBody>
                Are you sure you want to have that milkshake?
              </PopoverBody>
            </PopoverContent>
          </InputGroup>
        </Popover>
        <HomeButton title="Search" />
        <Flex>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              mx={2}
              {...filterButtonStyles}
            >
              Location
            </MenuButton>
            <MenuList>
              <MenuItem>Sofia</MenuItem>
              <MenuItem>Stara Zagora</MenuItem>
              <MenuItem>Varna</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mx={2}>
              Job Type
            </MenuButton>
            <MenuList>
              <MenuItem>Full Time</MenuItem>
              <MenuItem>Part Time</MenuItem>
              <MenuItem>Contract</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mx={2}>
              Industry
            </MenuButton>
            <MenuList>
              <MenuItem>Tech</MenuItem>
              <MenuItem>Finance</MenuItem>
              <MenuItem>Healthcare</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mx={2}>
              Experience
            </MenuButton>
            <MenuList>
              <MenuItem>Junior</MenuItem>
              <MenuItem>Mid</MenuItem>
              <MenuItem>Senior</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </>
  );
};

export default JobListingsPage;
