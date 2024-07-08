import { useState } from "react";
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

const steps = [
  {
    title: "Enter Data",
    description: "Provide company and personal information",
  },
  { title: "Review", description: "Verify your input" },
];

const RecruiterVerificationPage = () => {
  const toast = useToast();
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const [formData, setFormData] = useState({
    companyName: "",
    companyWebsite: "",
    industry: "",
    businessRegNumber: "",
    companySize: "",
    companyAddress: "",
    fullName: "",
    jobTitle: "",
    workEmail: "",
    phoneNumber: "",
    linkedinProfile: "",
    taxId: "",
    recruitingLicense: "",
    yearsInBusiness: "",
    additionalInfo: "",
  });

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
      await axios.post("/recruiter-verification", { formData });

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
        description: "An error occured while submitting the form.",
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
                  <FormLabel>Company Name</FormLabel>
                  <Input
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Enter your company name"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Company Website</FormLabel>
                  <Input
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleInputChange}
                    type="url"
                    placeholder="https://www.example.com"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Industry</FormLabel>
                  <Select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    placeholder="Select industry"
                  >
                    <option value="tech">Technology</option>
                    <option value="finance">Finance</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="other">Other</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Business Registration Number</FormLabel>
                  <Input
                    name="businessRegNumber"
                    value={formData.businessRegNumber}
                    onChange={handleInputChange}
                    placeholder="Enter registration number"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Company Size</FormLabel>
                  <Select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleInputChange}
                    placeholder="Select company size"
                  >
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501+">501+ employees</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Company Address</FormLabel>
                  <Input
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleInputChange}
                    placeholder="Enter company address"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>CEO Full Name</FormLabel>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Your Job Title</FormLabel>
                  <Input
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    placeholder="Enter your job title"
                  />
                </FormControl>
              </VStack>
              <VStack w="50%">
                <FormControl isRequired>
                  <FormLabel>Work Email</FormLabel>
                  <Input
                    name="workEmail"
                    value={formData.workEmail}
                    onChange={handleInputChange}
                    type="email"
                    placeholder="company@company.com"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    type="tel"
                    placeholder="Enter company number"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>LinkedIn Profile URL</FormLabel>
                  <Input
                    name="linkedinProfile"
                    value={formData.linkedinProfile}
                    onChange={handleInputChange}
                    type="url"
                    placeholder="https://www.linkedin.com/in/yourprofile"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Tax ID / EIN</FormLabel>
                  <Input
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleInputChange}
                    placeholder="Enter your Tax ID or EIN"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>
                    Recruiting License Number (if applicable)
                  </FormLabel>
                  <Input
                    name="recruitingLicense"
                    value={formData.recruitingLicense}
                    onChange={handleInputChange}
                    placeholder="Enter your recruiting license number"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Years in Business</FormLabel>
                  <Input
                    name="yearsInBusiness"
                    value={formData.yearsInBusiness}
                    onChange={handleInputChange}
                    type="number"
                    placeholder="Enter years in business"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Additional Information</FormLabel>
                  <Textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    placeholder="Any additional details about your company or recruitment needs"
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
        <title>JobConqueror - Recruiter Verification</title>
      </Helmet>
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
          Verify recruiter data
        </Text>
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
                <Button type="submit" colorScheme="blue" ml="auto">
                  Submit for Verification
                </Button>
              )}
            </Flex>
          </VStack>
        </form>
      </Box>
    </>
  );
};

export default RecruiterVerificationPage;
