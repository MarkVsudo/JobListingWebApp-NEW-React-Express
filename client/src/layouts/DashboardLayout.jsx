import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DashboardSidebar from "../components/DashboardSidebar";
import { Flex } from "@chakra-ui/react";

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <Flex>
        <DashboardSidebar />
        <Outlet />
      </Flex>
      <Footer />
    </>
  );
};

export default DashboardLayout;
