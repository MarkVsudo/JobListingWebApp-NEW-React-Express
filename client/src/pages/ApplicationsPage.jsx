import { Helmet } from "react-helmet";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
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
import { AuthContext } from "../contexts/AuthContext";

const ApplicationsPage = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`/api/user-job-applications`);
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching job applications:", error);
      }
    };

    if (user) {
      fetchApplications();
    }
  }, [user]);

  return (
    <>
      <Helmet>
        <title>JobConqueror - Job Applications</title>
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
            {applications ? (
              applications.map((application) => (
                <Tr bg="white" key={application.application_id}>
                  <Td py="2rem" fontSize="1.025rem">
                    {new Intl.DateTimeFormat("en-GB", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(new Date(application.application_date))}
                  </Td>
                  <Td fontSize="1.025rem">
                    <ChakraLink
                      as={ReactRouterLink}
                      to="/"
                      _hover={{ textDecoration: "none" }}
                    >
                      {application.title}
                    </ChakraLink>
                  </Td>

                  <Td fontSize="1.025rem">
                    <ChakraLink
                      as={ReactRouterLink}
                      to={`/company/${application.company_name.toLowerCase()}`}
                      _hover={{ textDecoration: "none" }}
                    >
                      {application.company_name}
                    </ChakraLink>
                  </Td>
                </Tr>
              ))
            ) : (
              <Text>No applications found</Text>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ApplicationsPage;
