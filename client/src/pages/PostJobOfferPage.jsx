import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  HStack,
  Radio,
  RadioGroup,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
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
  const navigate = useNavigate();
  const toast = useToast();

  const [salaryRadioValue, setSalaryRadioValue] = useState("1");
  const format = (val) => `$` + val;
  const parse = (val) => val.replace(/^\$/, "");

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const [minSalary, setMinSalary] = useState("1");
  const [maxSalary, setMaxSalary] = useState("1");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    employment_type: "",
    salary:
      salaryRadioValue === "1"
        ? "Not specified"
        : `${minSalary} - ${maxSalary}`,
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

  const handleFormData = (e) => {
    e.preventDefault();
  };

  const handleReviewBtn = () => {
    toast({
      title: "Review your information",
      description: "Please review your information before submitting the form.",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleFormSubmissionBtn = async () => {
    try {
      const formDataWithUserId = { ...formData, user_id: user.user_id };
      await axios.post("/api/job-offer", formDataWithUserId);

      toast({
        title: "Form submitted successfully",
        description: "Your job offer has been send for review.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setFormData({});
      navigate("/profile");
    } catch (error) {
      console.error("Error submitting job offer:", error);
      toast({
        title: "Submission failed",
        description: "An error occurred while submitting the job offer.",
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
                  <FormControl isRequired>
                    <FormLabel>Job Title</FormLabel>
                    <Input
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter job title"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Experience Level</FormLabel>
                    <Select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                    >
                      <option value="Not Specified">Not specified</option>
                      <option value="Internship">Internship</option>
                      <option value="0-2 years">0-2 years experience</option>
                      <option value="3-5 years">3-5 years experience</option>
                      <option value="5+ years">5+ years experience</option>
                    </Select>
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
                </VStack>

                <VStack w="100%">
                  <FormControl>
                    <FormLabel>Requirements</FormLabel>
                    <Textarea
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleInputChange}
                      placeholder="Enter job requirements"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Location</FormLabel>
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Enter job location"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Employment Type</FormLabel>
                    <Select
                      name="employment_type"
                      value={formData.employment_type}
                      onChange={handleInputChange}
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Temporary">Temporary</option>
                      <option value="Freelance">Freelance</option>
                    </Select>
                  </FormControl>
                  <VStack w="100%" alignItems="baseline" my="0.25rem">
                    <RadioGroup
                      onChange={(value) => {
                        setSalaryRadioValue(value);
                        setFormData((prevData) => ({
                          ...prevData,
                          salary:
                            value === "1"
                              ? "Not specified"
                              : `$${minSalary} - $${maxSalary}`,
                        }));
                      }}
                      value={salaryRadioValue}
                    >
                      <HStack>
                        <Radio value="1">Not specified</Radio>
                        <Radio value="2">Monthly rate</Radio>
                      </HStack>
                    </RadioGroup>

                    {salaryRadioValue === "1" ? (
                      <strong>No specified salary</strong>
                    ) : (
                      <HStack
                        textAlign="center"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <NumberInput
                          min={1}
                          max={maxSalary}
                          onChange={(valueString) => {
                            const value = parse(valueString);
                            setMinSalary(value);
                            setFormData((prevData) => ({
                              ...prevData,
                              salary: `$${value} - $${maxSalary}`,
                            }));
                          }}
                          value={format(minSalary)}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <strong>-</strong>
                        <NumberInput
                          min={1}
                          onChange={(valueString) => {
                            const value = parse(valueString);
                            setMaxSalary(value);
                            setFormData((prevData) => ({
                              ...prevData,
                              salary: `$${minSalary} - $${value}`,
                            }));
                          }}
                          value={format(maxSalary)}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </HStack>
                    )}
                  </VStack>
                  <FormControl isRequired>
                    <FormLabel>Application Deadline</FormLabel>
                    <Input
                      name="application_deadline"
                      type="date"
                      min={minDate}
                      value={formData.application_deadline}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </VStack>
              </Flex>

              <FormControl isRequired w="100%">
                <FormLabel>Job Description</FormLabel>
                <Editor
                  apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                  init={{
                    height: 400,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "paste",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | fontselect fontsizeselect | " +
                      "bold italic backcolor | alignleft aligncenter alignright alignjustify | " +
                      "bullist numlist outdent indent | removeformat | ",
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

  const currentDate = new Date();
  const date = currentDate.getDate() + 1;
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const paddedDate = date < 10 ? `0${date}` : date;
  const paddedMonth = month < 10 ? `0${month}` : month;

  const minDate = `${year}-${paddedMonth}-${paddedDate}`;

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
                      <StepDescription display={{ base: "none", sm: "block" }}>
                        {step.description}
                      </StepDescription>
                    </Box>
                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>
              <form onSubmit={handleFormData}>
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
                        onClick={() => {
                          setActiveStep((prev) => prev + 1);
                          handleReviewBtn();
                        }}
                        ml="auto"
                      >
                        Review Information
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        colorScheme="blue"
                        ml="auto"
                        onClick={handleFormSubmissionBtn}
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
