import React from "react";
import {
  Box,
  Flex,
  Img,
  VStack,
  Text,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";

import { FaRegBuilding } from "react-icons/fa";
import { MdOutlinePersonOutline } from "react-icons/md";
import { TbPigMoney } from "react-icons/tb";
import { LuBrain } from "react-icons/lu";

const JobOffer = ({
  offer,
  currentOffer,
  setSelectedOffer,
  saveJobOffer,
  savedJobs,
  deleteSavedJobOffer,
}) => {
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
            {
              isSaved
                ? deleteSavedJobOffer(offer.job_id)
                : saveJobOffer(offer.job_id);
            }
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
        <Text display="flex" alignItems="center" gap="0.125rem">
          <FaRegBuilding fontSize="1rem" />
          {offer.employment_type}
        </Text>
        <Text display="flex" alignItems="center" gap="0.125rem">
          <LuBrain fontSize="1rem" />
          {offer.experience}
        </Text>
        <Text display="flex" alignItems="center" gap="0.125rem">
          <MdOutlinePersonOutline fontSize="1.25rem" />
          {offer.applicants} Applicants
        </Text>
        <Text display="flex" alignItems="center" gap="0.125rem">
          <TbPigMoney fontSize="1.125rem" />
          {offer.salary}
        </Text>
      </Flex>
    </Box>
  );
};

export default JobOffer;
