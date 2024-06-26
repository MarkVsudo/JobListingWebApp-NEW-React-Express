import { Helmet } from "react-helmet";
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Text,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { CiBookmarkRemove } from "react-icons/ci";

const SavedJobsPage = () => {
  return (
    <>
      <Helmet>
        <title>JobConqueror - Applications</title>
      </Helmet>
      <TableContainer mx="10rem" w="100%">
        <Table size="sm">
          <Thead bg="var(--blue-gray)">
            <Tr>
              <Th color="white" fontSize="1.125rem">
                Save date
              </Th>
              <Th color="white" fontSize="1.125rem">
                Job offer
              </Th>
              <Th color="white" fontSize="1.125rem">
                Company
              </Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr bg="white">
              <Td py="2rem" fontSize="1.025rem">
                06.06.2024
              </Td>
              <Td fontSize="1.025rem">
                <ChakraLink
                  as={ReactRouterLink}
                  to="/"
                  _hover={{ textDecoration: "none" }}
                >
                  Full-Stack Engineer Intern
                </ChakraLink>
              </Td>

              <Td fontSize="1.025rem">
                <ChakraLink
                  as={ReactRouterLink}
                  to="/"
                  _hover={{ textDecoration: "nonee" }}
                >
                  TelebidPro
                </ChakraLink>
              </Td>
              <Td>
                <Button
                  variant="link"
                  gap="0.5rem"
                  fontSize="1.025rem"
                  color="red"
                >
                  <CiBookmarkRemove fontSize="1.125rem" />
                  <Text pb="1px">Remove</Text>
                </Button>
              </Td>
            </Tr>
            <Tr bg="white">
              <Td py="2rem" fontSize="1.025rem">
                21.07.2024
              </Td>
              <Td fontSize="1.025rem">
                <ChakraLink
                  as={ReactRouterLink}
                  to="/"
                  _hover={{ textDecoration: "none" }}
                >
                  Senior Automation QA
                </ChakraLink>
              </Td>

              <Td fontSize="1.025rem">
                <ChakraLink
                  as={ReactRouterLink}
                  to="/"
                  _hover={{ textDecoration: "nonee" }}
                >
                  Alphabet LTD.
                </ChakraLink>
              </Td>
              <Td>
                <Button
                  variant="link"
                  gap="0.5rem"
                  fontSize="1.025rem"
                  color="red"
                >
                  <CiBookmarkRemove fontSize="1.125rem" />
                  <Text pb="1px">Remove</Text>
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SavedJobsPage;
