import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import {
  Box,
  Button,
  Flex,
  Text,
  VStack,
  HStack,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const formatDateForEurope = (isoDate) => {
  const date = new Date(isoDate);
  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Europe/London", // Change this to your desired European time zone
    hour12: false,
  });

  const [
    { value: day },
    ,
    { value: month },
    ,
    { value: year },
    ,
    { value: hour },
    ,
    { value: minute },
    ,
    { value: second },
  ] = formatter.formatToParts(date);

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

const RequestItem = ({ from, type, createdAt }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg="var(--blue-gray)" borderRadius="md" p={4} mb={3}>
        <Flex alignItems="center" color="white">
          <HStack align="start" spacing={3}>
            <Text fontWeight={700}>
              From:{" "}
              <Text as="span" fontWeight={400}>
                {from}
              </Text>
            </Text>
            <Text fontWeight={700}>
              Type:{" "}
              <Text as="span" fontWeight={400}>
                {type}
              </Text>
            </Text>
            <Text fontWeight={700}>
              Time:{" "}
              <Text as="span" fontWeight={400}>
                {formatDateForEurope(createdAt)}
              </Text>
            </Text>
          </HStack>
          <Spacer />
          <HStack>
            <Button size="sm" colorScheme="blue" onClick={onOpen}>
              See details
            </Button>
            <Button size="sm" colorScheme="green">
              Approve
            </Button>
            <Button size="sm" colorScheme="red">
              Reject
            </Button>
          </HStack>
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="var(--blue-gray)" color="white">
            {type} Details
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <Text>From: {from}</Text>
            <Text>Type: {type}</Text>
            <Text>Time: {formatDateForEurope(createdAt)}</Text>
            {/* Add more details here as needed */}
          </ModalBody>
          <ModalFooter bg="var(--blue-gray)">
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green">Approve</Button>
            <Button colorScheme="red" ml={3}>
              Reject
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const VerificationReviewPage = () => {
  const [verificationReq, setVerificationReq] = useState([]);

  useEffect(() => {
    const fetchVerificationReq = async () => {
      try {
        const response = await axios.get("/api/verification-request");
        setVerificationReq(response.data);
      } catch (error) {
        console.error(
          "An error occurred while fetching verification awaiting requests:",
          error
        );
      }
    };

    fetchVerificationReq();
  }, []);

  return (
    <>
      <Helmet>
        <title>JobConqueror - Verification Review</title>
      </Helmet>
      <Flex direction="column" mx="10rem" w="100%">
        <Text fontSize="1.25rem" fontWeight={700} mb="1rem">
          Upcoming requests
        </Text>
        <VStack spacing={1} align="stretch" w="100%">
          {verificationReq.map((request, index) => (
            <RequestItem
              key={index}
              from={request.company_name || request.name}
              type={request.company_name ? "Job Offer" : "Company"}
              createdAt={request.created_at}
            />
          ))}
        </VStack>
      </Flex>
    </>
  );
};

export default VerificationReviewPage;
