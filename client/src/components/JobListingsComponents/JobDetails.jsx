import { useRef, useState } from "react";
import DOMPurify from "dompurify";
import {
  Flex,
  Img,
  Text,
  VStack,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  Checkbox,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { MdOutlinePersonOutline } from "react-icons/md";
import HomeButton from "../HomeComponents/HomeButton";

const JobDetails = ({ currentOffer }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const { value } = e.target;
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
              <Input type="tel" placeholder="Enter your phone number" />
            </FormControl>
            <FormControl my="0.5rem">
              <FormLabel>
                LinkedIn URL{" "}
                <span style={{ fontWeight: "normal" }}>(optional)</span>
              </FormLabel>
              <Input type="url" placeholder="Enter your LinkedIn URL" />
            </FormControl>
            <FormControl my="0.5rem">
              <FormLabel>Attached files</FormLabel>
              <Menu closeOnSelect={false}>
                <MenuButton as={Button}>Select Files</MenuButton>
                <MenuList>
                  <MenuItemOption>
                    <Checkbox value="file1" onChange={handleFileChange}>
                      File 1
                    </Checkbox>
                  </MenuItemOption>
                  <MenuItemOption>
                    <Checkbox value="file2" onChange={handleFileChange}>
                      File 2
                    </Checkbox>
                  </MenuItemOption>
                  <MenuItemOption>
                    <Checkbox value="file3" onChange={handleFileChange}>
                      File 3
                    </Checkbox>
                  </MenuItemOption>
                </MenuList>
              </Menu>
            </FormControl>
            <FormControl>
              <FormLabel>Motivational Letter</FormLabel>
              <Textarea placeholder="Write your motivational letter" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <HomeButton title="Submit" />
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
        <Flex p="0.75rem 2rem" w="100%" justify="space-between" align="center">
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
        <Flex
          className="job-description"
          direction="column"
          p="0 2rem 2rem 2rem"
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
        />
      </Flex>
    </>
  );
};

export default JobDetails;
