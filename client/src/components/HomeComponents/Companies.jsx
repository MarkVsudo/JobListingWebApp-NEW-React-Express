import { Img, Flex, keyframes } from "@chakra-ui/react";
import visaIcon from "../../assets/visa_logo.png";
import googleIcon from "../../assets/google_logo.png";
import discordIcon from "../../assets/discord_logo.png";
import awsIcon from "../../assets/aws_logo.png";
import microsoftIcon from "../../assets/microsoft_logo.png";

const slide = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(250%); }
`;

const companies = [
  {
    icon: visaIcon,
    alt: "Visa logo",
    height: "2rem",
  },
  {
    icon: googleIcon,
    alt: "Google logo",
    height: "2.5rem",
  },
  {
    icon: discordIcon,
    alt: "Discord logo",
    height: "5rem",
  },
  {
    icon: awsIcon,
    alt: "Amazon Web Services logo",
    height: "2rem",
  },
  {
    icon: microsoftIcon,
    alt: "Microsoft logo",
    height: "2rem",
  },
];

const Companies = () => {
  return (
    <Flex w="100%" overflow="hidden" bg="var(--blue-gray)" py="1rem">
      <Flex
        minW="fit-content"
        animation={`${slide} 10s linear infinite`}
        alignItems="center"
      >
        {[...companies].map((company, index) => (
          <Img
            key={index}
            src={company.icon}
            alt={company.alt}
            h={company.height}
            mx="1.5rem"
            filter="grayscale(100%)"
            transition="filter 350ms ease-in-out"
            _hover={{
              filter: "grayscale(0)",
            }}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default Companies;
