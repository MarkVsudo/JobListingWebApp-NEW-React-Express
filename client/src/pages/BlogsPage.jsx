import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import DOMPurify from "dompurify";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import Pagination from "../components/BlogComponents/Pagination";
import BlogTags from "../components/BlogComponents/BlogTags";
import BlogAuthor from "../components/BlogComponents/BlogAuthor";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of blogs per page

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blogs");
        setBlogs(response.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  // Slice blogs array to get current page's blogs
  const currentBlogs = blogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Helmet>
        <title>{`JobConqueror - Blogs `}</title>
      </Helmet>
      <Container maxW={"7xl"} p="12">
        <Heading as="h1">Stories by the best</Heading>

        {/* Render current page's blogs */}
        {currentBlogs.map((blog, index) => (
          <Box
            key={index}
            marginTop={{ base: "1", sm: "5" }}
            display="flex"
            flexDirection={{ base: "column", sm: "row" }}
            justifyContent="space-between"
          >
            <Box
              display="flex"
              flex="1"
              marginRight="3"
              position="relative"
              alignItems="center"
            >
              <Box
                width={{ base: "100%", sm: "85%" }}
                zIndex="2"
                marginLeft={{ base: "0", sm: "5%" }}
                marginTop="5%"
              >
                <Box textDecoration="none" _hover={{ textDecoration: "none" }}>
                  <Image
                    borderRadius="lg"
                    src={blog.blog_banner}
                    alt={`${blog.blog_title} blog image`}
                    objectFit="contain"
                  />
                </Box>
              </Box>
              <Box zIndex="1" width="100%" position="absolute" height="100%">
                <Box
                  bgGradient={useColorModeValue(
                    "radial(var(--dark-blue) 1px, transparent 1px)",
                    "radial(var(--blue-gray) 1px, transparent 1px)"
                  )}
                  backgroundSize="20px 20px"
                  opacity="0.4"
                  height="100%"
                />
              </Box>
            </Box>
            <Box
              display="flex"
              flex="1"
              flexDirection="column"
              justifyContent="center"
              marginTop={{ base: "3", sm: "0" }}
            >
              <BlogTags tags={blog.blog_tags.split(",")} />
              <Heading marginTop="1">
                <Text textDecoration="none" _hover={{ textDecoration: "none" }}>
                  {blog.blog_title}
                </Text>
              </Heading>
              <Text
                as="p"
                marginTop="2"
                color={useColorModeValue("gray.700", "gray.200")}
                fontSize="lg"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(blog.blog_content.slice(0, 270)),
                }}
              />
              <Flex align="center" gap="2rem">
                <BlogAuthor
                  name={blog.fullName}
                  date={new Date(blog.blog_date)}
                />
                <ChakraLink
                  as={ReactRouterLink}
                  to={`/blog/${index + 1}`}
                  mt="0.5rem"
                  color="var(--cyan)"
                  fontWeight={600}
                  _hover={{ textDecoration: "none" }}
                >
                  Read more
                </ChakraLink>
              </Flex>
            </Box>
          </Box>
        ))}

        {/* Pagination */}
        <Pagination
          blogs={blogs}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </Container>
    </>
  );
};

export default BlogsPage;
