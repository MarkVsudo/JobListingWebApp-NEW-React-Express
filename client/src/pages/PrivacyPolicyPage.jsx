import { Helmet } from "react-helmet";
import {
  Box,
  Heading,
  Text,
  VStack,
  UnorderedList,
  ListItem,
  Container,
  useBreakpointValue,
} from "@chakra-ui/react";

const PrivacyPolicyPage = () => {
  const headingSize = useBreakpointValue({ base: "md", md: "lg" });
  const subheadingSize = useBreakpointValue({ base: "md" });

  return (
    <>
      <Helmet>
        <title>JobConqueror - Privacy Policy</title>
      </Helmet>
      <Container maxW="container.xl" py={[5, 10]} px={[4, 6, 8]}>
        <VStack spacing={[4, 6, 8]} align="stretch">
          <Heading as="h1" size={headingSize}>
            Privacy Policy
          </Heading>

          <Text fontSize="sm">Last updated: {new Date().toDateString()}</Text>

          <Box>
            <Heading as="h2" size={subheadingSize} mb={2}>
              1. Introduction
            </Heading>
            <Text fontSize="sm">
              Welcome to JobConqueror. We respect your privacy and are committed
              to protecting your personal data. This privacy policy will inform
              you about how we look after your personal data and tell you about
              your privacy rights and how the law protects you.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size={subheadingSize} mb={2}>
              2. Data We Collect
            </Heading>
            <Text fontSize="sm" mb={2}>
              We may collect, use, store and transfer different kinds of
              personal data about you which we have grouped together as follows:
            </Text>
            <UnorderedList pl={5} fontSize="sm">
              <ListItem>Identity Data</ListItem>
              <ListItem>Contact Data</ListItem>
              <ListItem>Technical Data</ListItem>
              <ListItem>Profile Data</ListItem>
              <ListItem>Usage Data</ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Heading as="h2" size={subheadingSize} mb={2}>
              3. How We Use Your Data
            </Heading>
            <Text fontSize="sm" mb={2}>
              We will only use your personal data when the law allows us to.
              Most commonly, we will use your personal data in the following
              circumstances:
            </Text>
            <UnorderedList pl={5} fontSize="sm">
              <ListItem>To register you as a new customer</ListItem>
              <ListItem>To process and deliver your order</ListItem>
              <ListItem>To manage our relationship with you</ListItem>
              <ListItem>
                To improve our website, products/services, marketing or customer
                relationships
              </ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Heading as="h2" size={subheadingSize} mb={2}>
              4. Data Security
            </Heading>
            <Text fontSize="sm">
              We have put in place appropriate security measures to prevent your
              personal data from being accidentally lost, used or accessed in an
              unauthorized way, altered or disclosed.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size={subheadingSize} mb={2}>
              5. Data Retention
            </Heading>
            <Text fontSize="sm">
              We will only retain your personal data for as long as necessary to
              fulfill the purposes we collected it for, including for the
              purposes of satisfying any legal, accounting, or reporting
              requirements.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size={subheadingSize} mb={2}>
              6. Your Legal Rights
            </Heading>
            <Text fontSize="sm" mb={2}>
              Under certain circumstances, you have rights under data protection
              laws in relation to your personal data, including the right to:
            </Text>
            <UnorderedList pl={5} fontSize="sm">
              <ListItem>Request access to your personal data</ListItem>
              <ListItem>Request correction of your personal data</ListItem>
              <ListItem>Request erasure of your personal data</ListItem>
              <ListItem>Object to processing of your personal data</ListItem>
              <ListItem>
                Request restriction of processing your personal data
              </ListItem>
              <ListItem>Request transfer of your personal data</ListItem>
              <ListItem>Right to withdraw consent</ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Heading as="h2" size={subheadingSize} mb={2}>
              7. Changes to This Privacy Policy
            </Heading>
            <Text fontSize="sm">
              We may update our privacy policy from time to time. We will notify
              you of any changes by posting the new privacy policy on this page
              and updating the "Last updated" date at the top of this privacy
              policy.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size={subheadingSize} mb={2}>
              8. Contact Us
            </Heading>
            <Text fontSize="sm">
              If you have any questions about this privacy policy or our privacy
              practices, please contact us at: privacy@jobconqueror.com
            </Text>
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default PrivacyPolicyPage;
