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

  // console.log(currentOffer.requirements.split(", "));

  const countryAbbreviation = {
    Chinese: "https://flagsapi.com/CN/flat/64.png",
    Spanish: "https://flagsapi.com/ES/flat/64.png",
    English: "https://flagsapi.com/GB/flat/64.png",
    Hindi: "https://flagsapi.com/IN/flat/64.png",
    Arabic: "https://flagsapi.com/SA/flat/64.png",
    Portuguese: "https://flagsapi.com/PT/flat/64.png",
    Russian: "https://flagsapi.com/RU/flat/64.png",
    Japanese: "https://flagsapi.com/JP/flat/64.png",
    German: "https://flagsapi.com/DE/flat/64.png",
    Korean: "https://flagsapi.com/KR/flat/64.png",
    French: "https://flagsapi.com/FR/flat/64.png",
    Turkish: "https://flagsapi.com/TR/flat/64.png",
    Greek: "https://flagsapi.com/GR/flat/64.png",
    Serbian: "https://flagsapi.com/RS/flat/64.png",
    Croatian: "https://flagsapi.com/HR/flat/64.png",
    Albanian: "https://flagsapi.com/AL/flat/64.png",
    Romanian: "https://flagsapi.com/RO/flat/64.png",
    Bosnian: "https://flagsapi.com/BA/flat/64.png",
    Bulgarian: "https://flagsapi.com/BG/flat/64.png",
  };

  const [countryFlags, setCountryFlags] = useState([]);
  const [programmingLangIcons, setProgrammingLangIcons] = useState([]);

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

    for (let requirement of jobRequirements) {
      if (countryObjectKeys.includes(requirement)) {
        let response = countryAbbreviation[requirement];
        newFlags.push(response);
      }
    }

    setCountryFlags(newFlags);
  };

  const handleProgramminLangIcons = () => {
    let newIcons = [];

    for (let requirement of jobRequirements) {
      if (
        programmingLanguages.includes(requirement) &&
        !Object.keys(countryAbbreviation).includes(requirement)
      ) {
        let response = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${requirement}/${requirement}-original.svg`;
        newIcons.push(response);
      }
    }

    setProgrammingLangIcons(newIcons);
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
                    <Img key={index} src={flag} alt="Human language flag" />
                  ))}
                {programmingLangIcons.length &&
                  programmingLangIcons.map((icon, index) => (
                    <Img
                      key={index}
                      src={icon}
                      alt="Programming language icon"
                      h="44px"
                    />
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
