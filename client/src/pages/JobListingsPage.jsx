import { Helmet } from "react-helmet";
import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
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
import filterOptions from "../data/filterOptions.json";

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
      const selectedFilters =
        newParams.get(paramKey)?.split(",").filter(Boolean) || [];

      if (selectedFilters.includes(filter)) {
        const updatedFilters = selectedFilters.filter(
          (item) => item !== filter
        );
        if (updatedFilters.length > 0) {
          newParams.set(paramKey, updatedFilters.join(","));
        } else {
          newParams.delete(paramKey);
        }
      } else {
        selectedFilters.push(filter);
        newParams.set(paramKey, selectedFilters.join(","));
      }

      return newParams;
    });
  };

  const handleSearchInput = (e) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
  };

  const handleSearchInputBtn = () => {
    const newParams = new URLSearchParams(searchParams);

    if (newParams.has("query")) {
      newParams.set("query", searchQuery);
    } else {
      newParams.append("query", searchQuery);
    }

    setSearchParams(newParams);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    setSelectedLocations(
      params.get("location")?.split(",").filter(Boolean) || []
    );
    setSelectedJobType(params.get("jobType")?.split(",").filter(Boolean) || []);
    setSelectedIndustry(
      params.get("industry")?.split(",").filter(Boolean) || []
    );
    setSelectedExperience(
      params.get("experience")?.split(",").filter(Boolean) || []
    );
    setSelectedSalary(params.get("salary")?.split(",").filter(Boolean) || []);
    setSelectedCompanySize(
      params.get("companySize")?.split(",").filter(Boolean) || []
    );

    setSearchQuery(params.get("query") || "");

    const fetchOffers = async () => {
      try {
        const response = await axios.get(
          `/api/job-listings?${params.toString()}`
        );
        setOffers(response.data);
      } catch (error) {
        console.error("Error fetching job listings:", error);
      }
    };

    fetchOffers();
  }, [searchParams]);

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
        p={{ base: "2rem 1rem", md: "3rem 5rem" }}
        bg="var(--blue-gray)"
        color="white"
        direction={{ base: "column", md: "row" }}
        align={{ base: "center", md: "flex-start" }}
      >
        <Flex
          direction="column"
          gap=".5rem"
          align={{ base: "center", md: "flex-start" }}
        >
          <Text as="h1" fontSize="1.5rem" fontWeight={600} zIndex={1}>
            Find your dream job
          </Text>
          <Text
            as="span"
            fontWeight={300}
            textAlign={{ base: "center", md: "left" }}
            zIndex={1}
          >
            Looking for jobs? Browse our latest job openings
          </Text>
        </Flex>
        <Box
          {...rectangleHeaderStyles}
          bg="var(--dark-blue)"
          top="1rem"
          right={{ base: "1rem", md: "5rem" }}
          transform="rotate(70deg)"
        />
        <Box
          {...rectangleHeaderStyles}
          bg="var(--light-blue)"
          top="-7rem"
          right={{ base: "-3rem", md: "-8rem" }}
          transform="rotate(80deg)"
        />
        <Box
          {...rectangleHeaderStyles}
          bg="var(--cyan)"
          top="-12rem"
          right={{ base: "3rem", md: "7rem" }}
          transform="rotate(30deg)"
        />
        <Box
          {...rectangleHeaderStyles}
          bg="var(--dark-blue)"
          top="-3rem"
          right={{ base: "10rem", md: "17rem" }}
          transform="rotate(-40deg)"
        />
        <Box
          {...rectangleHeaderStyles}
          bg="var(--light-blue)"
          top="5rem"
          right={{ base: "15rem", md: "28rem" }}
          transform="rotate(30deg)"
        />
        <Box
          {...rectangleHeaderStyles}
          bg="var(--cyan)"
          top="-10rem"
          right={{ base: "20rem", md: "33rem" }}
          transform="rotate(70deg)"
        />
      </Flex>
      {/* Search Filters */}
      <Flex
        bg="white"
        w="100%"
        padding={{
          base: "1rem",
          md: "1rem 3rem",
          xl: "1rem 4rem",
          "2xl": "1rem 5rem",
        }}
        alignItems="center"
        justifyContent="center"
        direction={{ base: "column", xl: "row" }}
        gap={{ base: "0.75rem", xl: "0" }}
      >
        <InputGroup gap="1rem" w={{ base: "", md: "lg" }}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Job title or company"
            list="datalistOptions"
            onChange={handleSearchInput}
          />
          <datalist id="datalistOptions">
            {recentSearches.map((search, index) => (
              <option key={index} value={search} />
            ))}
          </datalist>
          <HomeButton title="Search" onClick={handleSearchInputBtn} />
        </InputGroup>
        <Flex
          mx="0.75rem"
          direction={{ base: "row", md: "row" }}
          mt={{ base: "1rem", md: "0" }}
          gap={{ base: 1.5, lg: 3 }}
          flexWrap={{ base: "wrap", md: "nowrap" }}
          justify={{ base: "center", md: "flex-start" }}
        >
          <Box
            width={{ base: "calc(50% - 0.75rem)", md: "auto" }}
            mb={{ base: 2, md: 0 }}
          >
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                {...filterButtonStyles}
                width="100%"
              >
                Location
              </MenuButton>
              <MenuList>
                <VStack align="flex-start" px="1rem">
                  {filterOptions.locations.map((location) => (
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
          </Box>

          <Box
            width={{ base: "calc(50% - 0.75rem)", md: "auto" }}
            mb={{ base: 2, md: 0 }}
          >
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                {...filterButtonStyles}
                width="100%"
              >
                Job Type
              </MenuButton>
              <MenuList>
                <VStack align="flex-start" px="1rem">
                  {filterOptions.jobTypes.map((jobType) => (
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
          </Box>

          <Box
            width={{ base: "calc(50% - 0.75rem)", md: "auto" }}
            mb={{ base: 2, md: 0 }}
          >
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                {...filterButtonStyles}
                width="100%"
              >
                Industry
              </MenuButton>
              <MenuList>
                <VStack align="flex-start" px="1rem">
                  {filterOptions.industries.map((industry) => (
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
          </Box>

          <Box
            width={{ base: "calc(50% - 0.75rem)", md: "auto" }}
            mb={{ base: 2, md: 0 }}
          >
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                {...filterButtonStyles}
                width="100%"
              >
                Experience
              </MenuButton>
              <MenuList>
                <VStack align="flex-start" px="1rem">
                  {filterOptions.experienceLevels.map((experienceLevel) => (
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
          </Box>

          <Box
            width={{ base: "calc(50% - 0.75rem)", md: "auto" }}
            mb={{ base: 2, md: 0 }}
          >
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                {...filterButtonStyles}
                width="100%"
              >
                Salary
              </MenuButton>
              <MenuList>
                <VStack align="flex-start" px="1rem">
                  {filterOptions.salaries.map((salary) => (
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
          </Box>

          <Box
            width={{ base: "calc(50% - 0.75rem)", md: "auto" }}
            mb={{ base: 2, md: 0 }}
          >
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                {...filterButtonStyles}
                width="100%"
              >
                Company size
              </MenuButton>
              <MenuList>
                <VStack align="flex-start" px="1rem">
                  {filterOptions.companySizes.map((companySize) => (
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
          </Box>
        </Flex>
        <HomeButton title="Apply filters" mt={{ base: "1rem", md: "0" }} />
      </Flex>
      {/* Job Listings */}
      <Flex
        w="100%"
        p={{
          base: "1rem",
          md: "2rem",
          lg: "2rem 3rem",
          xl: "2rem 4rem",
          "2xl": "2rem 5rem",
        }}
        gap="1rem"
        bg="var(--light-blue)"
        direction={{ base: "column", lg: "row" }}
      >
        {/* Aside */}
        <Flex
          direction="column"
          w={{ base: "100%", lg: "30%" }}
          gap="1rem"
          position={{ base: "static", lg: "sticky" }}
          h="50%"
          top="2rem"
        >
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

          <Flex
            direction={{ base: "column", md: "row", lg: "column" }}
            maxH={{ base: "auto", md: "300px", lg: "100vh" }}
            gap={{ base: "1rem", md: "7rem", lg: "1rem" }}
            mt="1rem"
            className="job-listing"
            overflowX={{ base: "visible", md: "auto", lg: "visible" }}
            overflowY={{ base: "visible", md: "hidden", lg: "auto" }}
            css={{
              "@media screen and (min-width: 48em) and (max-width: 61.99em)": {
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "-ms-overflow-style": "none",
                "scrollbar-width": "none",
              },
            }}
          >
            {offers.map((offer) => (
              <Box
                key={offer.job_id}
                flexShrink={{ base: 1, md: 0, lg: 1 }}
                w={{ base: "100%", md: "300px", lg: "100%" }}
              >
                <JobOffer
                  offer={offer}
                  currentOffer={currentOffer}
                  setSelectedOffer={setSelectedOffer}
                  saveJobOffer={saveJobOffer}
                  savedJobs={savedJobs}
                  deleteSavedJobOffer={deleteSavedJobOffer}
                />
              </Box>
            ))}
          </Flex>
        </Flex>
        {/* Main */}
        {/* Job Description */}
        {currentOffer && offers.length ? (
          <Box w={{ base: "100%", lg: "70%" }}>
            <JobDetails currentOffer={currentOffer} />
          </Box>
        ) : (
          offers.length === 0 && (
            <Box w={{ base: "100%", lg: "70%" }}>
              <VStack align="flex-start" ml={{ base: "25%", lg: "35%" }}>
                <Text fontWeight="500">
                  There are no offers available for your preferences.
                </Text>
                <Text fontWeight="500">Please try applying other filters.</Text>
                <VStack align="flex-start">
                  {searchParams.get("query") && (
                    <Text>Search Query: {searchParams.get("query")}</Text>
                  )}
                  {searchParams.get("location") && (
                    <Text>Location: {searchParams.get("location")}</Text>
                  )}
                  {searchParams.get("jobType") && (
                    <Text>Job Type: {searchParams.get("jobType")}</Text>
                  )}
                  {searchParams.get("industry") && (
                    <Text>Industry: {searchParams.get("industry")}</Text>
                  )}
                  {searchParams.get("experience") && (
                    <Text>Experience: {searchParams.get("experience")}</Text>
                  )}
                  {searchParams.get("companySize") && (
                    <Text>Company Size: {searchParams.get("companySize")}</Text>
                  )}
                </VStack>
              </VStack>
            </Box>
          )
        )}
      </Flex>
    </>
  );
};

export default JobListingsPage;
