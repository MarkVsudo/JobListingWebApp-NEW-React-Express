import { useContext, useState, useEffect } from "react";
import {
  Box,
  Flex,
  Img,
  VStack,
  Text,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { FaRegBuilding } from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";
import { LuBrain } from "react-icons/lu";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

const JobOffer = ({ offer, currentOffer = {}, setSelectedOffer }) => {
  const { user } = useContext(AuthContext);
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await axios.get(
          `/api/save-job-offer?userId=${user.user_id}`
        );
        setSavedJobs(response.data);
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      }
    };

    if (user) {
      fetchSavedJobs();
    }
  }, [user]);

  const saveJobOffer = async (jobId) => {
    try {
      const userId = user.user_id;
      await axios.post("/api/save-job-offer", { jobId, userId });
      setSavedJobs((prev) => [...prev, jobId]);
    } catch (error) {
      console.error("Error saving job offer:", error);
    }
  };

  const deleteSavedJobOffer = async (jobId) => {
    try {
      const userId = user.user_id;
      await axios.delete("/api/save-job-offer", { data: { userId, jobId } });
      setSavedJobs(savedJobs.filter((savedJob) => savedJob !== jobId));
    } catch (error) {
      console.error("Error deleting saved job offer:", error);
    }
  };

  const isSaved = savedJobs.includes(offer.job_id);

  return (
    <Box
      key={offer.job_id}
      as="button"
      p="1rem"
      borderRadius="1rem"
      bg="white"
      transition="all 250ms ease-in-out"
      boxShadow={
        currentOffer.job_id === offer.job_id
          ? "inset 0 0 0 3px var(--dark-blue)"
          : "none"
      }
      onClick={() => setSelectedOffer(offer)}
      w={{ base: "100%", md: "25rem", lg: "100%" }}
      h={{ base: "unset", md: "100%", lg: "unset" }}
    >
      <Flex align="center" justify="space-between">
        <Img
          src={offer.company_logo}
          alt="Job offer company logo"
          objectFit="contain"
          w="50px"
          h="50px"
        />
        <VStack align="flex-start" textAlign="start" mx="2rem" w="100%">
          <Text fontSize="1.25rem" fontWeight={600}>
            {offer.title}
          </Text>
          <Text fontWeight={300}>{offer.short_description}</Text>
        </VStack>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            isSaved
              ? deleteSavedJobOffer(offer.job_id)
              : saveJobOffer(offer.job_id);
          }}
          aria-label="Save job offer"
          icon={isSaved ? <IoBookmark /> : <IoBookmarkOutline />}
          color="var(--cyan)"
          borderRadius="full"
          bg="transparent"
          fontSize="1.25rem"
          _hover={{ bg: "var(--light-blue)" }}
        />
      </Flex>
      <Divider my="1rem" />
      <Flex justify="space-between">
        <Text display="flex" alignItems="center" gap="0.2rem">
          <FaRegBuilding fontSize="1rem" />
          {offer.employment_type}
        </Text>
        <Text display="flex" alignItems="center" gap="0.2rem">
          <LuBrain fontSize="1rem" />
          {offer.experience}
        </Text>
        <Text display="flex" alignItems="center" gap="0.2rem">
          <TbPigMoney fontSize="1.125rem" />
          {offer.salary}
        </Text>
      </Flex>
    </Box>
  );
};

export default JobOffer;
