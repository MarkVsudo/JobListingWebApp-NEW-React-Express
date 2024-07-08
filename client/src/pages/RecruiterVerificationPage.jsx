import React from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";

const RecruiterVerificationPage = () => {
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    toast({
      title: "Form submitted.",
      description: "We'll verify your information and get back to you soon.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      <Helmet>
        <title>JobConqueror - Recruiter Verification</title>
      </Helmet>
      <Flex
        minHeight="100vh"
        width="full"
        align="center"
        justifyContent="center"
      >
        <Box
          borderWidth={1}
          px={4}
          width="full"
          maxWidth="500px"
          borderRadius={4}
          textAlign="center"
          boxShadow="lg"
          bg="white"
        >
          <Box p={4}>
            <Heading>Recruiter Verification</Heading>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} mt={8}>
                <FormControl isRequired>
                  <FormLabel>Company Name</FormLabel>
                  <Input type="text" placeholder="Enter your company name" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Company Website</FormLabel>
                  <Input type="url" placeholder="https://www.example.com" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Industry</FormLabel>
                  <Select placeholder="Select industry">
                    <option value="tech">Technology</option>
                    <option value="finance">Finance</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="other">Other</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Business Registration Number</FormLabel>
                  <Input type="text" placeholder="Enter registration number" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Your Full Name</FormLabel>
                  <Input type="text" placeholder="Enter your full name" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Your Job Title</FormLabel>
                  <Input type="text" placeholder="Enter your job title" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Work Email</FormLabel>
                  <Input type="email" placeholder="you@yourcompany.com" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <Input type="tel" placeholder="Enter your phone number" />
                </FormControl>
                <FormControl>
                  <FormLabel>LinkedIn Profile URL</FormLabel>
                  <Input
                    type="url"
                    placeholder="https://www.linkedin.com/in/yourprofile"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Additional Information</FormLabel>
                  <Textarea placeholder="Any additional details about your company or recruitment needs" />
                </FormControl>
                <Button type="submit" colorScheme="blue" width="full">
                  Submit for Verification
                </Button>
              </VStack>
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default RecruiterVerificationPage;
