import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import AuthNavbar from "../components/AuthNavbar";

const AuthLayout = () => {
  return (
    <Box bg="var(--dark-blue)" minHeight="100vh">
      <AuthNavbar />
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
