import { Img, Flex, Text } from "@chakra-ui/react";
import ProcessImg from "../../assets/process_svg.svg";

let processData = [
  {
    count: "1",
    title: "Job apply",
    text: "Choose a job according to your preferences. Make sure you can meet the requirements and already understand how the job is chosen.",
  },
  {
    count: "2",
    title: "Candidate selection",
    text: "Choose a job according to your preferences. Make sure you can meet the requirements and already understand how the job is chosen.",
  },
  {
    count: "3",
    title: "Interview",
    text: "Choose a job according to your preferences. Make sure you can meet the requirements and already understand how the job is chosen.",
  },
];

const Process = () => {
  return (
    <Flex
      bg="var(--blue-gray)"
      borderRadius="12px"
      my="10rem"
      w="68vw"
      mx="auto"
    >
      <Flex gap="5rem" p="3rem" transform="translateX(-7rem)" pos="relative">
        {processData.map((step, index) => (
          <Flex
            key={index}
            direction="column"
            p="1rem"
            h="max-content"
            w="15rem"
            gap="0.5rem"
            bg="white"
            boxShadow="var(--box-shadow)"
            borderRadius="12px"
          >
            <Flex
              justifyContent="center"
              alignItems="center"
              bg="var(--cyan)"
              borderRadius="12px"
              w="3rem"
              h="3rem"
            >
              <Text fontWeight={700} color="white" fontSize="1.25rem">
                {step.count}
              </Text>
            </Flex>
            <Text color="black" fontWeight={700} fontSize="1.25rem">
              {step.title}
            </Text>
            <Text color="black" opacity="0.8">
              {step.text}
            </Text>
          </Flex>
        ))}
        <Img
          src={ProcessImg}
          alt="Process image"
          pos="absolute"
          bottom="0"
          right="-22vw"
          h="125%"
        />
      </Flex>
    </Flex>
  );
};

export default Process;
