import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import {
  Flex,
  Spinner,
  Button,
  Heading,
  Text,
  Img,
  VStack,
  Center,
  Stack,
  Box,
} from "@chakra-ui/react";
import { FaChevronLeft, FaFacebook } from "react-icons/fa";
import { SiLinkedin } from "react-icons/si";
import BlogTags from "../components/BlogComponents/BlogTags";

const BlogPage = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`/api/blog/${blogId}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, [blogId]);

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  let sanitizedBlogContent = blog ? DOMPurify.sanitize(blog.blog_content) : "";

  sanitizedBlogContent = sanitizedBlogContent.replace(
    /<h2>(.*?)<\/h2>/g,
    (match, p1) =>
      `<h2 id="${p1.replace(/\s+/g, "-").toLowerCase()}">${p1}</h2>`
  );

  // Create a DOM parser
  let parser = new DOMParser();
  let doc = parser.parseFromString(sanitizedBlogContent, "text/html");

  // Get all h2 tags
  let h2Tags = doc.getElementsByTagName("h2");

  // Extract text content and put it into an array
  let h2Texts = Array.from(h2Tags).map((tag) => tag.textContent);

  const [activeSection, setActiveSection] = useState("");

  const handleSectionClick = (text) => {
    setActiveSection(text);
    const element = document.getElementById(
      text.replace(/\s+/g, "-").toLowerCase()
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!blog) {
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

  const currentUrl = window.location.href;

  const shareToFacebook = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}`;
    window.open(facebookShareUrl, "_blank");
  };

  const shareToLinkedIn = () => {
    const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      currentUrl
    )}&title=${encodeURIComponent(blog.blog_title)}`;
    window.open(linkedInShareUrl, "_blank");
  };

  return (
    <>
      <Helmet>
        <title>{`JobConqueror - ${blog.blog_title}`}</title>
      </Helmet>
      <Flex px={{ base: "1rem", md: "3.5rem" }} direction="column" my="2rem">
        <Button
          variant="link"
          _hover={{
            textDecoration: "none",
            ".leftIcon": {
              transform: "translateX(-5px)",
              transition: "transform 0.2s ease-in-out",
            },
          }}
          color="black"
          onClick={handleBackClick}
          leftIcon={<FaChevronLeft className="leftIcon" />}
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
            height={{ base: "15rem", md: "30rem" }}
            borderRadius="1rem"
            boxShadow="0 0 25px #00000014"
            alt="Blog post banner image"
            mb={{ base: "0.5rem", lg: "3rem" }}
          />
          <Flex
            direction={{ base: "column", lg: "row" }}
            justify="space-between"
            px={{ base: "0", lg: "10rem" }}
          >
            <VStack
              w={{ base: "100%", lg: "20%" }}
              position={{ base: "relative", lg: "sticky" }}
              top="2rem"
              h="100%"
            >
              <VStack
                alignItems={{ base: "center", lg: "flex-start" }}
                w="100%"
                className="left-border-animation"
              >
                {h2Texts.map((text) => (
                  <Text
                    key={text}
                    fontWeight={600}
                    cursor="pointer"
                    opacity={activeSection === text ? 1 : 0.6}
                    className={activeSection === text ? "active" : ""}
                    onClick={() => handleSectionClick(text)}
                  >
                    {text}
                  </Text>
                ))}
              </VStack>
              <VStack
                alignItems={{ base: "center", lg: "flex-start" }}
                w="100%"
              >
                <Text fontWeight={600}>Share blog</Text>
                <Stack spacing={2} align={"center"} maxW={"md"} w={"full"}>
                  {/* Facebook */}
                  <Button
                    w={"full"}
                    colorScheme={"facebook"}
                    leftIcon={<FaFacebook />}
                    onClick={shareToFacebook}
                  >
                    <Center>
                      <Text>Share to Facebook</Text>
                    </Center>
                  </Button>
                  {/* LinkedIn */}
                  <Button
                    w={"full"}
                    colorScheme={"messenger"}
                    leftIcon={<SiLinkedin />}
                    onClick={shareToLinkedIn}
                  >
                    <Center>
                      <Text>Share to Linkedin</Text>
                    </Center>
                  </Button>
                </Stack>
              </VStack>
            </VStack>
            <Box w={{ base: "100%", lg: "70%" }} mt={{ base: "3rem", lg: "0" }}>
              <Text
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: sanitizedBlogContent }}
              />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default BlogPage;
