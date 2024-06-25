import { Helmet } from "react-helmet";
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

const ApplicationsPage = () => {
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
                Submission date
              </Th>
              <Th color="white" fontSize="1.125rem">
                Job offer
              </Th>
              <Th color="white" fontSize="1.125rem">
                Company
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr bg="white">
              <Td py="2rem" fontSize="1.025rem">
                06.06.2024
              </Td>
              <Td fontSize="1.025rem">Full-Stack Engineer Intern</Td>
              <Td fontSize="1.025rem">
                <ChakraLink
                  as={ReactRouterLink}
                  to="/"
                  _hover={{ textDecoration: "nonee" }}
                >
                  TelebidPro
                </ChakraLink>
              </Td>
            </Tr>
            <Tr bg="white">
              <Td py="2rem" fontSize="1.025rem">
                21.07.2024
              </Td>
              <Td fontSize="1.025rem">Senior Automation QA</Td>
              <Td fontSize="1.025rem">
                <ChakraLink
                  as={ReactRouterLink}
                  to="/"
                  _hover={{ textDecoration: "nonee" }}
                >
                  Alphabet LTD.
                </ChakraLink>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ApplicationsPage;
