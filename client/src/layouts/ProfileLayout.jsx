import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileSidebar from "../components/ProfileSidebar";
import { Flex } from "@chakra-ui/react";

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <Flex mt="2rem" align="flex-start">
        <ProfileSidebar />
        <Outlet />
      </Flex>
      <Footer />
    </>
  );
};

export default DashboardLayout;
