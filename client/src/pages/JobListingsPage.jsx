import { Helmet } from "react-helmet";
import { useState, useEffect, useContext } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
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

const locations = ["Sofia", "Stara Zagora", "Varna"];
const jobTypes = [
  "Full-time",
  "Part-time",
  "Temporary",
  "Internship",
  "Freelance",
];
const industries = ["IT (Information Technology)", "Finance", "Healthcare"];
const experienceLevels = [
  "Junior level",
  "Mid level",
  "Senior level",
  "0-2 years",
  "3-5 years",
  "5+ years",
  "Internship",
  "Not Specified",
];
const salaries = [
  "Specified salary",
  "$500 - $1000",
  "$1001 - $2000",
  "$2001 - $4000",
  "$4001 - $7000",
  "+$7000",
];
const companySizes = [
  "Small (1-50 employees)",
  "Medium (51 - 200 employees)",
  "Large (+200 employees)",
];

const JobListingsPage = () => {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);

  let [searchParams, setSearchParams] = useSearchParams();
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);
  const [selectedSalary, setSelectedSalary] = useState([]);
  const [selectedCompanySize, setSelectedCompanySize] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (filter, setFilter, paramKey) => {
    setFilter((prevSelected) =>
      prevSelected.includes(filter)
        ? prevSelected.filter((item) => item !== filter)
        : [...prevSelected, filter]
    );

    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      const selectedFilters = newParams.get(paramKey)?.split(",") || [];

      if (selectedFilters.includes(filter)) {
        newParams.set(
          paramKey,
          selectedFilters.filter((item) => item !== filter).join(",")
        );
      } else {
        selectedFilters.push(filter);
        newParams.set(paramKey, selectedFilters.join(","));
      }

      return newParams;
    });
  };

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const params = new URLSearchParams();
        if (selectedLocations.length)
          params.append("location", selectedLocations.join(","));
        if (selectedJobType.length)
          params.append("jobType", selectedJobType.join(","));
        if (selectedIndustry.length)
          params.append("industry", selectedIndustry.join(","));
        if (selectedExperience.length)
          params.append("experience", selectedExperience.join(","));
        if (selectedSalary.length)
          params.append("salary", selectedSalary.join(","));
        if (selectedCompanySize.length)
          params.append("companySize", selectedCompanySize.join(","));

        const response = await axios.get(
          `/api/job-listings?${params.toString()}`
        );
        setOffers(response.data);
      } catch (error) {
        console.error("Error fetching job listings:", error);
      }
    };
    console.log(offers[0]);

    fetchOffers();
  }, [
    searchParams,
    selectedLocations,
    selectedJobType,
    selectedIndustry,
    selectedExperience,
    selectedSalary,
    selectedCompanySize,
  ]);

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
            onChange={(e) => setSearchQuery(e.target.value)}
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
                {locations.map((location) => (
                  <Checkbox
                    key={location}
                    isChecked={selectedLocations.includes(location)}
                    onChange={() =>
                      handleChange(location, setSelectedLocations, "location")
                    }
                  >
                    {location}
                  </Checkbox>
                ))}
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
                {jobTypes.map((jobType) => (
                  <Checkbox
                    key={jobType}
                    isChecked={selectedJobType.includes(jobType)}
                    onChange={() =>
                      handleChange(jobType, setSelectedJobType, "jobType")
                    }
                  >
                    {jobType}
                  </Checkbox>
                ))}
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
                {industries.map((industry) => (
                  <Checkbox
                    key={industry}
                    isChecked={selectedIndustry.includes(industry)}
                    onChange={() =>
                      handleChange(industry, setSelectedIndustry, "industry")
                    }
                  >
                    {industry}
                  </Checkbox>
                ))}
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
                {experienceLevels.map((experienceLevel) => (
                  <Checkbox
                    key={experienceLevel}
                    isChecked={selectedExperience.includes(experienceLevel)}
                    onChange={() =>
                      handleChange(
                        experienceLevel,
                        setSelectedExperience,
                        "experience"
                      )
                    }
                  >
                    {experienceLevel}
                  </Checkbox>
                ))}
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
                {salaries.map((salary) => (
                  <Checkbox
                    key={salary}
                    isChecked={selectedSalary.includes(salary)}
                    onChange={() =>
                      handleChange(salary, setSelectedSalary, "salary")
                    }
                  >
                    {salary}
                  </Checkbox>
                ))}
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
                {companySizes.map((companySize) => (
                  <Checkbox
                    key={companySize}
                    isChecked={selectedCompanySize.includes(companySize)}
                    onChange={() =>
                      handleChange(
                        companySize,
                        setSelectedCompanySize,
                        "companySize"
                      )
                    }
                  >
                    {companySize}
                  </Checkbox>
                ))}
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
            <Menu closeOnSelect={true}>
              <MenuButton
                as={Button}
                variant="outline"
                border="1px solid var(--cyan)"
                _hover={{
                  bg: "inherit",
                }}
                _active={{
                  bg: "inherit",
                }}
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
