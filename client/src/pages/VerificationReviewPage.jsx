import { useEffect, useState, useRef, useContext } from "react";
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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { AuthContext } from "../contexts/AuthContext";

const formatDateForEurope = (isoDate) => {
  const date = new Date(isoDate);
  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Europe/London",
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

const RequestItem = ({
  from,
  type,
  createdAt,
  description,
  userId,
  jobId,
  applicationDeadline,
  benefits,
  employementType,
  experience,
  location,
  requirements,
  salary,
  shortDescription,
  title,
  companyId,
  additionalInfo,
  banner,
  logo,
  businessRegNum,
  ceoFullname,
  companyAddress,
  companyImages,
  companyPerks,
  contactEmail,
  contactPhone,
  foundedYear,
  googleMapsUrl,
  industry,
  linkedInURL,
  numEmployees,
  recruitingLicense,
  size,
  taxId,
  onApprove,
  onReject,
}) => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const {
    isOpen: isApproveAlertOpen,
    onOpen: onApproveAlertOpen,
    onClose: onApproveAlertClose,
  } = useDisclosure();
  const {
    isOpen: isRejectAlertOpen,
    onOpen: onRejectAlertOpen,
    onClose: onRejectAlertClose,
  } = useDisclosure();

  const cancelRef = useRef();

  const handleApproval = async () => {
    try {
      await onApprove(type, jobId, companyId);
      onApproveAlertClose();
      onModalClose();
    } catch (error) {
      console.error("An error occurred while approving request", error);
    }
  };

  const handleRejection = async () => {
    try {
      await onReject(type, jobId, companyId);
      onRejectAlertClose();
      onModalClose();
    } catch (error) {
      console.error("An error occurred while rejecting request", error);
    }
  };

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
            <Button size="sm" colorScheme="blue" onClick={onModalOpen}>
              See details
            </Button>
            <Button size="sm" colorScheme="green" onClick={onApproveAlertOpen}>
              Approve
            </Button>
            <Button size="sm" colorScheme="red" onClick={onRejectAlertOpen}>
              Reject
            </Button>
          </HStack>
        </Flex>
      </Box>

      <Modal isOpen={isModalOpen} onClose={onModalClose} size="full">
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
            <Text>User ID: {userId}</Text>
            <Text>
              {type} Description: {description}
            </Text>
            {type === "Job Offer" ? (
              <>
                <Text>Job ID: {jobId}</Text>
                <Text>Application Deadline: {applicationDeadline}</Text>
                <Text>Benefits: {benefits}</Text>
                <Text>Employement Type: {employementType}</Text>
                <Text>Level of experience: {experience}</Text>
                <Text>Location: {location}</Text>
                <Text>Job Requirements: {requirements}</Text>
                <Text>Salary: {salary}</Text>
                <Text>Short Description: {shortDescription}</Text>
                <Text>Title: {title}</Text>
              </>
            ) : (
              <>
                <Text>Company ID: {companyId}</Text>
                <Text>Additional Information: {additionalInfo}</Text>
                <Text>Banner Image: {banner}</Text>
                <Text>Logo Image: {logo}</Text>
                <Text>Business Registration Number: {businessRegNum}</Text>
                <Text>CEO Full Name: {ceoFullname}</Text>
                <Text>Company Address: {companyAddress}</Text>
                <Text>Company Images: {companyImages}</Text>
                <Text>Company Perks: {companyPerks}</Text>
                <Text>Contact E-mail: {contactEmail}</Text>
                <Text>Contact Phone: {contactPhone}</Text>
                <Text>Founded Year: {foundedYear}</Text>
                <Text>Google Maps URL: {googleMapsUrl}</Text>
                <Text>Industry of work: {industry}</Text>
                <Text>LinkedIn URL: {linkedInURL}</Text>
                <Text>Number of employees: {numEmployees}</Text>
                <Text>Recruiting License: {recruitingLicense}</Text>
                <Text>Company size: {size}</Text>
                <Text>Tax ID: {taxId}</Text>
              </>
            )}
          </ModalBody>
          <ModalFooter bg="var(--blue-gray)">
            <Button colorScheme="blue" mr={3} onClick={onModalClose}>
              Close
            </Button>
            <Button colorScheme="green" onClick={onApproveAlertOpen}>
              Approve
            </Button>
            <Button colorScheme="red" ml={3} onClick={onRejectAlertOpen}>
              Reject
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isApproveAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onApproveAlertClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Approve Request
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? This action will approve the request sent from the
              user.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onApproveAlertClose}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={handleApproval} ml={3}>
                Approve
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog
        isOpen={isRejectAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onRejectAlertClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Reject Request
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? This action will reject the request sent from the
              user.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onRejectAlertClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleRejection} ml={3}>
                Reject
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

const VerificationReviewPage = () => {
  const [verificationReq, setVerificationReq] = useState([]);
  const { user } = useContext(AuthContext);

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

  useEffect(() => {
    if (user) {
      fetchVerificationReq();
    }
  }, [user]);

  const handleApprove = async (type, jobId, companyId) => {
    try {
      await axios.patch("/api/approve-request", {
        type,
        jobId,
        companyId,
        userEmail: user.email,
      });
      fetchVerificationReq();
    } catch (error) {
      console.error("An error occurred while approving request", error);
    }
  };

  const handleReject = async (type, jobId, companyId) => {
    try {
      await axios.delete("/api/reject-request", {
        data: { type, jobId, companyId, userEmail: user.email },
      });
      fetchVerificationReq();
    } catch (error) {
      console.error("An error occurred while rejecting request", error);
    }
  };

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
          {verificationReq.length > 0 ? (
            verificationReq.map((request, index) => (
              <RequestItem
                // Shared data
                key={index}
                from={request.company_name || request.name}
                type={request.company_name ? "Job Offer" : "Company"}
                createdAt={request.created_at}
                description={request.description || ""}
                userId={request.user_id}
                // Job Offer data
                jobId={request.job_id || ""}
                applicationDeadline={request.application_deadline || ""}
                benefits={request.benefits || ""}
                employementType={request.employement_type || ""}
                experience={request.experience || ""}
                location={request.location || ""}
                requirements={request.requirements || ""}
                salary={request.salary || ""}
                shortDescription={request.short_description || ""}
                title={request.title || ""}
                // Company data
                companyId={request.company_id || ""}
                additionalInfo={request.additional_info || ""}
                banner={request.banner || ""}
                logo={request.logo || ""}
                businessRegNum={request.business_reg_number || ""}
                ceoFullname={request.ceo_full_name || ""}
                companyAddress={request.company_address || ""}
                companyImages={request.company_images || ""}
                companyPerks={request.company_perks || ""}
                contactEmail={request.contact_email || ""}
                contactPhone={request.contact_phone || ""}
                foundedYear={request.founded_year || ""}
                googleMapsUrl={request.google_maps_url || ""}
                industry={request.industry || ""}
                linkedInURL={request.linkedin_url || ""}
                numEmployees={request.num_employees || ""}
                recruitingLicense={request.recruiting_license || ""}
                size={request.size || ""}
                taxId={request.tax_id || ""}
                // Event listeners
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))
          ) : (
            <Text>No requests available.</Text>
          )}
        </VStack>
      </Flex>
    </>
  );
};

export default VerificationReviewPage;
