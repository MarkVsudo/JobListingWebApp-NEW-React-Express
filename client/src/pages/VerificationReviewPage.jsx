import React from "react";
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

const RequestItem = ({ from, type, time }) => {
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
                {time}
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
            <Text>Time: {time}</Text>
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
  const requests = [
    { from: "Mark Veskov", type: "Job Offer", time: "08/07/2024 16:00" },
    { from: "Mark Veskov", type: "Company", time: "05/03/2024 12:30" },
  ];

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
          {requests.map((request, index) => (
            <RequestItem key={index} {...request} />
          ))}
        </VStack>
      </Flex>
    </>
  );
};

export default VerificationReviewPage;
