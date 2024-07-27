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
  Box,
  Text,
  Link,
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
      <Box overflowX="auto" mx="10rem" w="100%">
        <Table size="sm">
          <Thead bg="var(--blue-gray)" position="sticky" top={0} zIndex={1}>
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
              <Th color="white" fontSize="1.125rem">
                Status
              </Th>
              <Th color="white" fontSize="1.125rem">
                Motivational Letter
              </Th>
              <Th color="white" fontSize="1.125rem">
                Selected Files
              </Th>
              <Th color="white" fontSize="1.125rem">
                Phone Number
              </Th>
              <Th color="white" fontSize="1.125rem">
                LinkedIn
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {applications.length > 0 ? (
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
                      to={`/job/${application.job_id}`}
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
                  <Td fontSize="1.025rem">{application.status}</Td>
                  <Td fontSize="1.025rem">
                    <Text noOfLines={2}>{application.motivational_letter}</Text>
                  </Td>
                  <Td fontSize="1.025rem">
                    {application.selected_files
                      .split(",")
                      .map((file, index) => (
                        <Link
                          href={file}
                          isExternal
                          key={index}
                          mr={2}
                          color="blue.500"
                        >
                          File {index + 1}
                        </Link>
                      ))}
                  </Td>
                  <Td fontSize="1.025rem">{application.phone_number}</Td>
                  <Td fontSize="1.025rem">
                    <Link
                      href={application.linkedin_url}
                      isExternal
                      color="blue.500"
                    >
                      LinkedIn Profile
                    </Link>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={8}>
                  <Text>No applications found</Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default ApplicationsPage;
