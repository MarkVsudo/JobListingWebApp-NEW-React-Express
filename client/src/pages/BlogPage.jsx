import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Flex, Spinner, Button, Heading, Text, Img } from "@chakra-ui/react";
import { FaChevronLeft } from "react-icons/fa6";
import BlogTags from "../components/BlogComponents/BlogTags";

const BlogPage = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`/api/blog/${blogId}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [blogId]);

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  if (loading) {
    return (
      <Flex direction="column" justify="center" align="center" minHeight="65vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  if (!blog) {
    return <Flex textAlign="center">Error loading blog post.</Flex>;
  }

  // Function to format the date and time
  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${formattedDate} · ${formattedTime}`;
  };

  return (
    <>
      <Helmet>
        <title>{`JobConqueror - ${blog.blog_title}`}</title>
      </Helmet>
      <Flex px="3.5rem" direction="column" my="2rem">
        <Button
          variant="link"
          _hover={{ textDecoration: "none" }}
          color="black"
          onClick={handleBackClick}
          leftIcon={<FaChevronLeft />}
          mb="4"
          w="max-content"
        >
          Back
        </Button>
        <Flex
          direction="column"
          justify="center"
          textAlign="center"
          align="center"
          gap="0.75rem"
        >
          <BlogTags tags={blog.blog_tags.split(",")} />
          <Heading as="h1" maxW="45rem">
            {blog.blog_title}
          </Heading>
          <Text opacity="0.7">{formatDateTime(blog.blog_date)}</Text>
        </Flex>
        <Flex direction="column" mt="3rem">
          <Img
            src={blog.blog_banner}
            objectFit="cover"
            height="30rem"
            borderRadius="1rem"
            boxShadow="0 0 25px #00000014"
            alt="Blog post banner image"
            mb="3rem"
          />
          <Flex direction="column">
            <Text>{blog.blog_content}</Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default BlogPage;
