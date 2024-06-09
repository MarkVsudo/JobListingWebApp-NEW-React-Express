import { Img, Flex } from "@chakra-ui/react";
import visaIcon from "../../assets/visa_logo.png";
import googleIcon from "../../assets/google_logo.png";
import discordIcon from "../../assets/discord_logo.png";
import awsIcon from "../../assets/aws_logo.png";
import microsoftIcon from "../../assets/microsoft_logo.png";

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
    <Flex
      w="100vw"
      py="1rem"
      gap="3rem"
      alignItems="center"
      justifyContent="center"
      bg="var(--blue-gray)"
    >
      {companies.map((company, index) => (
        <Img
          key={index}
          src={company.icon}
          alt={company.alt}
          h={company.height}
          filter="grayscale(100%)"
          transition="filter 350ms ease-in-out"
          _hover={{
            filter: "grayscale(0)",
          }}
        />
      ))}
    </Flex>
  );
};

export default Companies;
