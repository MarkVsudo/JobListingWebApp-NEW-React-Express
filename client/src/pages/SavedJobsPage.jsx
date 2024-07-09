import { Helmet } from "react-helmet";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
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
import { AuthContext } from "../contexts/AuthContext";

const SavedJobsPage = () => {
  const { user } = useContext(AuthContext);
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await axios.get(`/api/user-saved-jobs`);
        setSavedJobs(response.data);
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      }
    };

    if (user) {
      fetchSavedJobs();
    }
  }, [user]);

  const deleteSavedJobOffer = async (jobId) => {
    try {
      const userId = user.user_id;
      await axios.delete("/api/save-job-offer", { data: { userId, jobId } });
      setSavedJobs(savedJobs.filter((savedJob) => savedJob.job_id !== jobId));
    } catch (error) {
      console.error("Error deleting saved job offer:", error);
    }
  };

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
            {savedJobs ? (
              savedJobs.map((savedJob) => (
                <Tr bg="white" key={savedJob.id}>
                  <Td py="2rem" fontSize="1.025rem">
                    {new Intl.DateTimeFormat("en-GB", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(new Date(savedJob.saved_at))}
                  </Td>
                  <Td fontSize="1.025rem">
                    <ChakraLink
                      as={ReactRouterLink}
                      to="/"
                      _hover={{ textDecoration: "none" }}
                    >
                      {savedJob.title}
                    </ChakraLink>
                  </Td>

                  <Td fontSize="1.025rem">
                    <ChakraLink
                      as={ReactRouterLink}
                      to="/"
                      _hover={{ textDecoration: "none" }}
                    >
                      {savedJob.company_name}
                    </ChakraLink>
                  </Td>
                  <Td>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSavedJobOffer(savedJob.job_id);
                      }}
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
              ))
            ) : (
              <Text>No saved jobs</Text>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SavedJobsPage;
