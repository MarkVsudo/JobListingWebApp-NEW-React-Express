import { Button } from "@chakra-ui/react";

const buttonStyles = {
  width: "100%",
  fontSize: "1.25rem",
  fontWeight: "500",
  paddingBlock: "2rem",
  backgroundColor: "var(--dark-blue)",
  color: "white",
  border: "2px solid var(--light-blue)",
  _hover: {
    backgroundColor: "var(--light-blue)",
    color: "var(--dark-blue)",
  },
};

const AuthButton = ({ title, onClick }) => {
  return (
    <Button {...buttonStyles} onClick={onClick}>
      {title}
    </Button>
  );
};

export default AuthButton;
