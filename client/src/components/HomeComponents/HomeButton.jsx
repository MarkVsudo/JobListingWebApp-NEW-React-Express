import { Button } from "@chakra-ui/react";

const buttonStyles = {
  width: "max-content",
  paddingInline: "2rem",
  fontWeight: "500",
  backgroundColor: "var(--cyan)",
  color: "white",
  _hover: {
    backgroundColor: "var(--blue-gray)",
  },
};

const HomeButton = ({ title, onClick }) => {
  return (
    <Button {...buttonStyles} onClick={onClick}>
      {title}
    </Button>
  );
};

export default HomeButton;
