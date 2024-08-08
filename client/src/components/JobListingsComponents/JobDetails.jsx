import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import { MdOutlinePersonOutline } from "react-icons/md";
import {
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Img,
  Input,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  VStack,
  Tooltip,
} from "@chakra-ui/react";
import HomeButton from "../HomeComponents/HomeButton";
import { AuthContext } from "../../contexts/AuthContext";
import programmingLanguages from "../../data/programmingLanguages.json";

const JobDetails = ({ currentOffer }) => {
  const { user } = useContext(AuthContext);
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  const countryAbbreviation = {
    Chinese: "CN",
    Spanish: "ES",
    English: "GB",
    Hindi: "IN",
    Arabic: "SA",
    Portuguese: "PT",
    Russian: "RU",
    Japanese: "JP",
    German: "DE",
    Korean: "KR",
    French: "FR",
    Turkish: "TR",
    Greek: "GR",
    Serbian: "RS",
    Croatian: "HR",
    Albanian: "AL",
    Romanian: "RO",
    Bosnian: "BA",
    Bulgarian: "BG",
  };

  const [countryFlags, setCountryFlags] = useState([]);
  const [programmingLangIcons, setProgrammingLangIcons] = useState([]);
  const [requirementToFlag, setRequirementToFlag] = useState({});
  const [requirementToIcon, setRequirementToIcon] = useState({});

  useEffect(() => {
    handleCountryFlags();
    handleProgramminLangIcons();

    const fetchUserFiles = async () => {
      try {
        const response = await axios.get(`/api/user-file`);
        if (Array.isArray(response.data.files)) {
          setFiles(response.data.files);
        } else {
          setFiles([]);
        }
      } catch (err) {
        console.error("Failed to fetch user files:", err);
        setFiles([]);
      }
    };

    if (user) {
      fetchUserFiles();
    }
  }, [user, currentOffer]);

  let jobRequirements = currentOffer.requirements.split(", ");

  const handleCountryFlags = () => {
    let countryObjectKeys = Object.keys(countryAbbreviation);
    let newFlags = [];
    let requirementToFlag = {};

    for (let requirement of jobRequirements) {
      if (countryObjectKeys.includes(requirement)) {
        let response = `https://flagsapi.com/${countryAbbreviation[requirement]}/flat/64.png`;
        newFlags.push(response);
        requirementToFlag[requirement] = response;
      }
    }

    setCountryFlags(newFlags);
    setRequirementToFlag(requirementToFlag);
  };

  const handleProgramminLangIcons = () => {
    let newIcons = [];
    let requirementToIcon = {};

    for (let requirement of jobRequirements) {
      if (
        programmingLanguages.includes(requirement) &&
        !Object.keys(countryAbbreviation).includes(requirement)
      ) {
        let response = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${requirement}/${requirement}-original.svg`;
        newIcons.push(response);
        requirementToIcon[requirement] = response;
      }
    }

    setProgrammingLangIcons(newIcons);
    setRequirementToIcon(requirementToIcon);
  };

  const [formData, setFormData] = useState({
    phoneNumber: "",
    linkedInURL: "",
    motivationalLetter: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleJobApplication = async () => {
    try {
      await axios.post("/api/job-application", {
        jobId: currentOffer.job_id,
        selectedFiles: selectedFiles.join(","),
        ...formData,
      });
    } catch (error) {
      console.error("An error occurred while applying for a job", error);
    }
  };

  const handleFileChange = (e) => {
    const value = e.target.value;
    setSelectedFiles((prev) =>
      prev.includes(value)
        ? prev.filter((file) => file !== value)
        : [...prev, value]
    );
  };

  const sanitizedDescription = currentOffer
    ? DOMPurify.sanitize(currentOffer.description)
    : "";

  return (
    <>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Job application form</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                name="phoneNumber"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl my="0.5rem">
              <FormLabel>
                LinkedIn URL{" "}
                <span style={{ fontWeight: "normal" }}>(optional)</span>
              </FormLabel>
              <Input
                name="linkedInURL"
                type="url"
                placeholder="Enter your LinkedIn URL"
                value={formData.linkedInURL}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl my="0.5rem">
              <FormLabel>Attached files</FormLabel>
              <Menu closeOnSelect={false}>
                <MenuButton as={Button}>Select Files</MenuButton>
                <MenuList>
                  {Array.isArray(files) && files.length > 0 ? (
                    files.map((file, index) => (
                      <MenuItemOption key={index}>
                        <Checkbox
                          value={file.file_url}
                          onChange={handleFileChange}
                        >
                          {file.file_name}
                        </Checkbox>
                      </MenuItemOption>
                    ))
                  ) : (
                    <Text>You haven't uploaded any files yet.</Text>
                  )}
                </MenuList>
              </Menu>
            </FormControl>
            <FormControl>
              <FormLabel>
                Motivational Letter{" "}
                <span style={{ fontWeight: "normal" }}>(optional)</span>
              </FormLabel>
              <Textarea
                name="motivationalLetter"
                placeholder="Write your motivational letter"
                value={formData.motivationalLetter}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <HomeButton title="Submit" onClick={handleJobApplication} />
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex
        w="100%"
        direction="column"
        align="flex-start"
        borderRadius="1rem"
        bg="white"
        boxShadow="var(--box-shadow)"
      >
        <Flex
          p={{ base: "0.75rem 1rem", sm: "0.75rem 2rem" }}
          w="100%"
          justify="space-between"
          align="center"
          direction={{ base: "column", md: "row" }}
          gap={{ base: "0.75rem", md: "0" }}
        >
          <Flex justify="space-between" align="center">
            <Img
              src={currentOffer.company_logo}
              alt="Job offer company logo"
              objectFit="contain"
              w="50px"
              h="50px"
              mr="2rem"
            />
            <VStack align="flex-start">
              <Text fontSize="1.25rem" fontWeight={600}>
                {currentOffer.title}
              </Text>
              <Text fontWeight={300}>{currentOffer.short_description}</Text>
            </VStack>
          </Flex>
          <Flex ml="2rem" gap="1rem">
            <Text display="flex" alignItems="center" gap="0.2rem">
              <MdOutlinePersonOutline fontSize="1.25rem" />
              {currentOffer.applicants} Applicants
            </Text>
            <HomeButton title="Apply now" onClick={onOpen} />
          </Flex>
        </Flex>
        <Divider w="95%" alignSelf="center" mb="1rem" />
        <VStack>
          <Flex w="100%" px="2rem" direction="column">
            <Text fontSize="1.085rem" fontWeight={700} mb="0.25rem">
              Requirements
            </Text>
            {countryFlags.length || programmingLangIcons.length ? (
              <HStack>
                {countryFlags.length &&
                  countryFlags.map((flag, index) => (
                    <Tooltip
                      key={index}
                      hasArrow
                      label={Object.keys(requirementToFlag)[index]}
                      className="requirement-tooltip"
                    >
                      <Img src={flag} alt="Human language flag" />
                    </Tooltip>
                  ))}
                {programmingLangIcons.length &&
                  programmingLangIcons.map((icon, index) => (
                    <Tooltip
                      key={index}
                      hasArrow
                      label={Object.keys(requirementToIcon)[index]}
                      className="requirement-tooltip"
                    >
                      <Img
                        src={icon}
                        alt="Programming language icon"
                        h="44px"
                      />
                    </Tooltip>
                  ))}
              </HStack>
            ) : (
              <Text>No requirements specified</Text>
            )}
          </Flex>
          <Flex
            className="job-description"
            direction="column"
            p={{ base: "0 1rem 1rem 1rem", sm: "0 2rem 2rem 2rem" }}
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
          />
        </VStack>
      </Flex>
    </>
  );
};

export default JobDetails;
