import { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Text,
  Input,
  Select,
  Textarea,
  VStack,
  HStack,
  useToast,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import { AuthContext } from "../contexts/AuthContext";

const steps = [
  {
    title: "Enter Data",
    description: "Provide job offer information",
  },
  { title: "Review", description: "Verify your input" },
];

const PostJobOfferPage = () => {
  const { user } = useContext(AuthContext);
  const toast = useToast();
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company_id: "",
    location: "",
    employment_type: "",
    salary: "",
    requirements: "",
    benefits: "",
    application_deadline: "",
    short_description: "",
    experience: "Not Specified",
  });

  const [verificationStatus, setVerificationStatus] = useState("not_submitted");

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      try {
        const response = await axios.get("/api/recruiter-verification");
        if (response.data.length > 0) {
          const { verified } = response.data[0];
          if (verified === 1) {
            setVerificationStatus("verified");
          } else if (verified === 0) {
            setVerificationStatus("awaiting");
          } else {
            setVerificationStatus("not_submitted");
          }
        } else {
          setVerificationStatus("not_submitted");
        }
      } catch (error) {
        console.error("Error fetching verification status:", error);
        setVerificationStatus("not_submitted");
      }
    };

    if (user) {
      fetchVerificationStatus();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataWithUserId = { ...formData, user_id: user.user_id };

      await axios.post("/api/job-offer", formDataWithUserId);

      setVerificationStatus("awaiting");

      toast({
        title: "Form submitted.",
        description: "We'll verify your information and get back to you soon.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(
        "Error while processing recruiter verification form:",
        error
      );
      toast({
        title: "Form submission failed.",
        description: "An error occurred while submitting the form.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const renderFormStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <HStack align="flex-start" spacing={10}>
              <VStack w="50%">
                <FormControl isRequired>
                  <FormLabel>Job Title</FormLabel>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter job title"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Experience Level</FormLabel>
                  <Select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                  >
                    <option value="Not Specified">Not specified</option>
                    <option value="Internship">Internship</option>
                    <option value="Junior level">Junior level</option>
                    <option value="Mid level">Mid level</option>
                    <option value="Senior level">Senior level</option>
                    <option value="0-2 years">0-2 years experience</option>
                    <option value="3-5 years">3-5 years experience</option>
                    <option value="5+ years">5+ years experience</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Job Description</FormLabel>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter job description"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Short Description</FormLabel>
                  <Textarea
                    name="short_description"
                    value={formData.short_description}
                    onChange={handleInputChange}
                    placeholder="Enter short job description"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Benefits</FormLabel>
                  <Textarea
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleInputChange}
                    placeholder="Enter job benefits"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Requirements</FormLabel>
                  <Textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    placeholder="Enter job requirements"
                  />
                </FormControl>
              </VStack>

              <VStack w="50%">
                <FormControl isRequired>
                  <FormLabel>Location</FormLabel>
                  <Input
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter job location"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Employment Type</FormLabel>
                  <Select
                    name="employment_type"
                    value={formData.employment_type}
                    onChange={handleInputChange}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Temporary">Temporary</option>
                    <option value="Internship">Internship</option>
                    <option value="Freelance">Freelance</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Salary</FormLabel>
                  <Input
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    placeholder="Enter salary range"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Application Deadline</FormLabel>
                  <Input
                    name="application_deadline"
                    type="date"
                    value={formData.application_deadline}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Company ID</FormLabel>
                  <Input
                    name="company_id"
                    type="number"
                    value={formData.company_id}
                    onChange={handleInputChange}
                    placeholder="Enter company ID"
                  />
                </FormControl>
              </VStack>
            </HStack>
          </>
        );
      case 1:
        return (
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold">Review your information:</Text>
            {Object.entries(formData).map(([key, value]) => (
              <Text key={key}>
                <strong>{key}:</strong> {value}
              </Text>
            ))}
          </VStack>
        );
      default:
        return null;
    }
  };
  return (
    <>
      <Helmet>
        <title>JobConqueror - Who We Are</title>
      </Helmet>
      {user ? (
        <Box
          borderWidth={1}
          mx="10rem"
          px={4}
          width="full"
          borderRadius={5}
          textAlign="center"
          boxShadow="lg"
          bg="white"
          p={4}
        >
          <Text fontSize="1.25rem" fontWeight={700} mb={4}>
            {verificationStatus === "verified"
              ? "Your request has been approved"
              : verificationStatus === "awaiting"
              ? "Your request has been sent for review"
              : "Verify recruiter data"}
          </Text>
          {verificationStatus === "verified" && (
            <>
              <Stepper index={activeStep} mb={8}>
                {steps.map((step, index) => (
                  <Step key={index}>
                    <StepIndicator>
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>
                    <Box flexShrink="0" textAlign="left">
                      <StepTitle>{step.title}</StepTitle>
                      <StepDescription>{step.description}</StepDescription>
                    </Box>
                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                  {renderFormStep()}
                  <Flex justifyContent="space-between" mt={4}>
                    {activeStep > 0 && (
                      <Button onClick={() => setActiveStep((prev) => prev - 1)}>
                        Back to Edit
                      </Button>
                    )}
                    {activeStep < steps.length - 1 ? (
                      <Button
                        onClick={() => setActiveStep((prev) => prev + 1)}
                        ml="auto"
                      >
                        Review Information
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        colorScheme="blue"
                        ml="auto"
                        onClick={handleSubmit}
                      >
                        Submit for Verification
                      </Button>
                    )}
                  </Flex>
                </VStack>
              </form>
            </>
          )}
        </Box>
      ) : (
        <Text>Fetching user</Text>
      )}
    </>
  );
};

export default PostJobOfferPage;
