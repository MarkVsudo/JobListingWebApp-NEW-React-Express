import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Editor } from "@tinymce/tinymce-react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  Text,
  Textarea,
  useSteps,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { AuthContext } from "../contexts/AuthContext";
import filterOptions from "../data/filterOptions.json";

const steps = [
  {
    title: "Enter Data",
    description: "Provide company and personal information",
  },
  { title: "Review", description: "Verify your input" },
];

const RecruiterVerificationPage = () => {
  const { user } = useContext(AuthContext);
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
    CEOfullName: "",
    workEmail: "",
    phoneNumber: "",
    linkedinProfile: "",
    taxId: "",
    recruitingLicense: "",
    additionalInfo: "",
    logo: "",
    banner: "",
    description: "",
    foundedYear: "",
    numEmployees: "",
    companyImages: "",
    companyPerks: "",
    googleMapsUrl: "",
    googleMapsIframe: "",
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

      await axios.post("/api/recruiter-verification", formDataWithUserId);

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
            <VStack spacing={3}>
              <Flex
                align="flex-start"
                gap={{ base: 3, sm: 10 }}
                w="100%"
                direction={{ base: "column", sm: "row" }}
              >
                <VStack w="100%">
                  {/* Company Basic Information */}
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
                      {filterOptions.jobSectors.map((industry, index) => (
                        <option key={index} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Company Size</FormLabel>
                    <Select
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      placeholder="Select company size"
                    >
                      <option value="1-10">1-50 employees</option>
                      <option value="11-50">51-200 employees</option>
                      <option value="51-200">+200 employees</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Number of Employees</FormLabel>
                    <Input
                      name="numEmployees"
                      value={formData.numEmployees}
                      onChange={handleInputChange}
                      type="number"
                      placeholder="Enter number of employees"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Founded Year</FormLabel>
                    <Input
                      name="foundedYear"
                      value={formData.foundedYear}
                      onChange={handleInputChange}
                      type="number"
                      placeholder="Enter founded year"
                    />
                  </FormControl>

                  {/* Company Visuals */}
                  <FormControl>
                    <FormLabel>Logo URL</FormLabel>
                    <Input
                      name="logo"
                      value={formData.logo}
                      onChange={handleInputChange}
                      placeholder="Enter logo URL"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Banner URL</FormLabel>
                    <Input
                      name="banner"
                      value={formData.banner}
                      onChange={handleInputChange}
                      placeholder="Enter banner URL"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Company Images (comma-separated URLs)</FormLabel>
                    <Input
                      name="companyImages"
                      value={formData.companyImages}
                      onChange={handleInputChange}
                      placeholder="Enter comma-separated image URLs"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Company Perks (comma-separated)</FormLabel>
                    <Input
                      name="companyPerks"
                      value={formData.companyPerks}
                      onChange={handleInputChange}
                      placeholder="Enter comma-separated perks"
                    />
                  </FormControl>
                  {/* CEO Information */}
                  <FormControl isRequired>
                    <FormLabel>CEO Full Name</FormLabel>
                    <Input
                      name="CEOfullName"
                      value={formData.CEOfullName}
                      onChange={handleInputChange}
                      placeholder="Enter CEO full name"
                    />
                  </FormControl>
                </VStack>
                <VStack w="100%">
                  {/* Company Contact Information */}
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
                  <FormControl>
                    <FormLabel>Google Maps URL</FormLabel>
                    <Input
                      name="googleMapsUrl"
                      value={formData.googleMapsUrl}
                      onChange={handleInputChange}
                      placeholder="Enter Google Maps URL"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Google Maps Iframe</FormLabel>
                    <Textarea
                      name="googleMapsIframe"
                      value={formData.googleMapsIframe}
                      onChange={handleInputChange}
                      placeholder="Enter Google Maps Iframe code"
                    />
                  </FormControl>

                  {/* Legal Information */}
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

                  {/* Additional Information */}
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
              </Flex>

              {/* Company Description */}
              <FormControl isRequired w="100%">
                <FormLabel>Company Description</FormLabel>
                <Editor
                  apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                  init={{
                    height: 400,
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | " +
                      "bold italic backcolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                  }}
                  value={formData.description}
                  onEditorChange={(content) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      description: content,
                    }));
                  }}
                />
              </FormControl>
            </VStack>
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
          {verificationStatus === "not_submitted" && (
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
                      <StepDescription display={{ base: "none", sm: "block" }}>
                        {step.description}
                      </StepDescription>
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

export default RecruiterVerificationPage;
