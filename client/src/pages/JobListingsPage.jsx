import { Helmet } from "react-helmet";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  Button,
  Box,
  Text,
  Checkbox,
  VStack,
  MenuOptionGroup,
  MenuItemOption,
} from "@chakra-ui/react";
import { SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";
import HomeButton from "../components/HomeComponents/HomeButton";
import JobDetails from "../components/JobListingsComponents/JobDetails";
import JobOffer from "../components/JobListingsComponents/JobOffer";
import { AuthContext } from "../contexts/AuthContext";

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

const recentSearches = [
  "Web Developer",
  "Financial Analyst",
  "UX/UI Designer",
  "Customer Support Specialist",
  "Marketing Coordinator",
];

const JobListingsPage = () => {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get("/api/job-listings");
        setOffers(response.data);
      } catch (error) {
        console.error("Error fetching job listings:", error);
      }
    };

    fetchOffers();
  }, []);

  const currentOffer = selectedOffer || offers[0];

  const { user } = useContext(AuthContext);
  const [savedJobs, setSavedJobs] = useState([]);

  const saveJobOffer = async (jobId) => {
    try {
      const userId = user.user_id;
      await axios.post("/api/save-job-offer", { jobId, userId });
      setSavedJobs((prev) => [...prev, jobId]);
    } catch (error) {
      console.error("Error saving job offer:", error);
    }
  };

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await axios.get(
          `/api/save-job-offer?userId=${user.user_id}`
        );
        setSavedJobs(response.data);
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      }
    };

    if (user) {
      fetchSavedJobs();
    }
  }, [user]);

  const deleteSavedJobOffer = async (jobId) => {
    try {
      const userId = user.user_id;
      await axios.delete("/api/save-job-offer", { data: { userId, jobId } });
      setSavedJobs(savedJobs.filter((savedJob) => savedJob !== jobId));
    } catch (error) {
      console.error("Error deleting saved job offer:", error);
    }
  };

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
        justifyContent="center"
      >
        <InputGroup gap="1rem" w="md">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search jobs..."
            list="datalistOptions"
          />
          <datalist id="datalistOptions">
            {recentSearches.map((search, index) => (
              <option key={index} value={search} />
            ))}
          </datalist>
          <HomeButton title="Search" />
        </InputGroup>
        <Flex mx="0.5rem">
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
              <VStack align="flex-start" px="1rem">
                <Checkbox>Sofia</Checkbox>
                <Checkbox>Stara Zagora</Checkbox>
                <Checkbox>Varna</Checkbox>
              </VStack>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              mx={2}
              {...filterButtonStyles}
            >
              Job Type
            </MenuButton>
            <MenuList>
              <VStack align="flex-start" px="1rem">
                <Checkbox>Full Time</Checkbox>
                <Checkbox>Part Time</Checkbox>
                <Checkbox>Contract</Checkbox>
              </VStack>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              mx={2}
              {...filterButtonStyles}
            >
              Industry
            </MenuButton>
            <MenuList>
              <VStack align="flex-start" px="1rem">
                <Checkbox>Tech</Checkbox>
                <Checkbox>Finance</Checkbox>
                <Checkbox>Healthcare</Checkbox>
              </VStack>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              mx={2}
              {...filterButtonStyles}
            >
              Experience
            </MenuButton>
            <MenuList>
              <VStack align="flex-start" px="1rem">
                <Checkbox>Junior</Checkbox>
                <Checkbox>Mid</Checkbox>
                <Checkbox>Senior</Checkbox>
              </VStack>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              mx={2}
              {...filterButtonStyles}
            >
              Salary
            </MenuButton>
            <MenuList>
              <VStack align="flex-start" px="1rem">
                <Checkbox>Specified salary</Checkbox>
                <Checkbox>$500 - $1000</Checkbox>
                <Checkbox>$1000 - $2000</Checkbox>
                <Checkbox>$2000 - $4000</Checkbox>
                <Checkbox>$4000 - $7000</Checkbox>
                <Checkbox>+$7000</Checkbox>
              </VStack>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              mx={2}
              {...filterButtonStyles}
            >
              Company size
            </MenuButton>
            <MenuList>
              <VStack align="flex-start" px="1rem">
                <Checkbox>Small (1-50 employees)</Checkbox>
                <Checkbox>Medium (51 - 200 employees)</Checkbox>
                <Checkbox>Large (200+ employees)</Checkbox>
              </VStack>
            </MenuList>
          </Menu>
        </Flex>
        <HomeButton title="Apply filters" />
      </Flex>
      {/* Job Listings */}
      <Flex w="100%" p="2rem 5rem" gap="1rem" bg="var(--light-blue)">
        {/* Aside */}
        <Flex direction="column" w="30%" gap="1rem">
          <Flex justify="space-between" align="center">
            <VStack align="flex-start">
              <Text fontWeight={600}>Related to "Web Developer"</Text>
              <Text fontWeight={300}>
                {offers.length} Job Openings Available
              </Text>
            </VStack>
            <Menu closeOnSelect={false}>
              <MenuButton
                as={Button}
                variant="outline"
                border="1px solid var(--cyan)"
              >
                Sort offers
              </MenuButton>
              <MenuList minWidth="240px">
                <MenuOptionGroup
                  defaultValue="relevance"
                  title="Order"
                  type="radio"
                >
                  <MenuItemOption value="relevance">Relevance</MenuItemOption>
                  <MenuItemOption value="asc">Ascending</MenuItemOption>
                  <MenuItemOption value="desc">Descending</MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </Flex>
          {/* Job Offers */}
          {offers.map((offer) => (
            <JobOffer
              key={offer.job_id}
              offer={offer}
              currentOffer={currentOffer}
              setSelectedOffer={setSelectedOffer}
              saveJobOffer={saveJobOffer}
              savedJobs={savedJobs}
              deleteSavedJobOffer={deleteSavedJobOffer}
            />
          ))}
        </Flex>
        {/* Main */}
        {/* Job Description */}
        {currentOffer && <JobDetails currentOffer={currentOffer} />}
      </Flex>
    </>
  );
};

export default JobListingsPage;
