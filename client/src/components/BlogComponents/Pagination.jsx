import React, { useState } from "react";
import { Flex, Button } from "@chakra-ui/react"; // Importing Flex and Button components from Chakra UI
import { GoArrowLeft, GoArrowRight } from "react-icons/go"; // Importing arrow icons

const Pagination = ({ blogs, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1); // State to manage current page

  const paginationStyles = {
    justify: "center",
    align: "center",
    width: "2.5rem",
    height: "2.5rem",
    borderRadius: ".5rem",
    fontSize: "1.125rem",
    bg: "var(--blue-gray)",
    color: "white",
    transition: "all 200ms ease-in-out",
    _hover: {
      bg: "var(--dark-blue)",
      color: "white",
    },
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page); // Update current page state
    onPageChange(page); // Call parent component's page change handler
  };

  return (
    <Flex mt="3rem" justify="center" gap="1.5rem">
      {/* Previous button */}
      <Button
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <GoArrowLeft />
      </Button>

      {/* Generate page buttons */}
      {Array.from({ length: totalPages }).map((_, index) => (
        <Button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          variant={currentPage === index + 1 ? "solid" : "outline"}
        >
          {index + 1}
        </Button>
      ))}

      {/* Next button */}
      <Button
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <GoArrowRight />
      </Button>
    </Flex>
  );
};

export default Pagination;
