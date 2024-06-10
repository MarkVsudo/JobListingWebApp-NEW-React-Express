import { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import {
  Flex,
  Box,
  Heading,
  Grid,
  GridItem,
  Button,
  Img,
  Text,
  VStack,
  HStack,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from "@chakra-ui/react";
import CVWritingImg from "../assets/recommendations-article-1.jpg";
import SoftSkillsImg from "../assets/recommendations-article-2.png";
import ApplyingImg from "../assets/recommendations-article-3.png";
import PatienceImg from "../assets/recommendations-article-4.jpg";
import NewsImg from "../assets/recommendations-article-5.jpg";
import ConfidenceImg from "../assets/recommendations-article-6.png";
import InterviewImg from "../assets/recommendations-article-7.png";

const headSquareStyle = {
  position: "absolute",
  top: "0",
  width: "15rem",
  height: "15rem",
  aspectRatio: "1/1",
  transform: "rotate(45deg)",
  backgroundColor: "var(--blue-gray)",
  boxShadow: "0px 0px 0px 30px #404b6962",
};

const sortBtnsStyle = {
  backgroundColor: "transparent",
  border: "2px solid var(--cyan)",

  _active: {
    color: "white",
    backgroundColor: "var(--dark-blue)",
  },
  _focus: {
    color: "white",
    backgroundColor: "var(--dark-blue)",
  },
};

const articles = {
  careerGuidance: {
    title: "Career Guidance",
    articles: [
      {
        title: "Learn how to write the perfect CV",
        text: "Crafting an effective CV is essential for standing out in the competitive job market. Begin by clearly outlining your professional experience, highlighting key achievements, and emphasizing skills relevant to the desired role. Tailor the content to align with the specific job requirements, showcasing your unique qualifications and demonstrating your value to potential employers. Utilize a clean and professional format, ensuring readability and coherence. Regularly update your CV to reflect your latest accomplishments and maintain its relevance in the dynamic job landscape.",
        img: CVWritingImg,
      },
      {
        title: "Which soft skills are required",
        text: "Soft skills play a crucial role in professional success. Explore the essential soft skills that employers value, such as communication, teamwork, adaptability, and problem-solving. Understand how cultivating these skills can enhance your performance in the workplace and contribute to your overall career development.",
        img: SoftSkillsImg,
      },
      {
        title: "What should you consider before applying for a job",
        text: "Before applying for a job, it's important to consider various factors that can impact your decision. Explore key considerations such as company culture, job responsibilities, growth opportunities, and work-life balance. Assessing these factors beforehand can help you make informed decisions and find a job that aligns with your career goals.",
        img: ApplyingImg,
      },
    ],
  },
  personalDevelopment: {
    title: "Personal Development",
    articles: [
      {
        title: "How to become more patient in today's fast world",
        text: "In today's fast-paced world, cultivating patience is a valuable skill. Discover strategies to enhance your patience, manage stress, and navigate challenging situations with a calm and composed mindset. Developing patience can lead to better decision-making, improved relationships, and a more fulfilling personal and professional life.",
        img: PatienceImg,
      },
      {
        title: "Become self-confident and master your mind",
        text: "Self-confidence is a key component of personal and professional success. Learn strategies to boost your self-confidence, overcome self-doubt, and master your mindset. Cultivating self-confidence can positively impact your career, relationships, and overall well-being. Take proactive steps to build a strong and resilient sense of self.",
        img: ConfidenceImg,
      },
    ],
  },
  jobMarket: {
    title: "Job Market",
    articles: [
      {
        title: "Latest news in the job market",
        text: "Stay updated on the latest trends and developments in the job market. Explore insights into industry changes, emerging job roles, and skill demands. Keeping abreast of the job market news can help you make informed career decisions, adapt to evolving trends, and position yourself for success in your professional journey.",
        img: NewsImg,
      },
    ],
  },
  interviewPreparation: {
    title: "Interview Preparation",
    articles: [
      {
        title:
          "Some potential questions recruiters might ask you in an interview",
        text: "Prepare for job interviews by familiarizing yourself with common questions recruiters might ask. Explore strategies for crafting compelling responses, showcasing your skills and experience, and making a positive impression. Being well-prepared for potential interview questions can increase your confidence and enhance your chances of success in securing the job.",
        img: InterviewImg,
      },
    ],
  },
};

const RecommendationsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const mainCategories = Object.keys(articles);

  const openModal = (article) => {
    setSelectedArticle(article);
    onOpen();
  };

  const filterArticlesByCategory = (category) => {
    setSelectedCategory(category);
  };

  const filteredArticles = selectedCategory
    ? articles[selectedCategory].articles
    : Object.values(articles).flatMap((category) => category.articles);

  return (
    <>
      <Helmet>
        <title>JobConqueror - Recommendations</title>
      </Helmet>
      <Box>
        <Flex
          pos="relative"
          justify="center"
          textAlign="center"
          p="3rem"
          bg="var(--dark-blue)"
          overflow="hidden"
        >
          <Box
            style={{
              ...headSquareStyle,
              left: "-5rem",
            }}
          ></Box>
          <Box
            style={{
              ...headSquareStyle,
              right: "-5rem",
            }}
          ></Box>
          <Heading
            as="h1"
            fontSize="2.5rem"
            lineHeight="3rem"
            color="var(--light-blue)"
          >
            Business Insights: Tips, Strategies and <br />
            Trends for Entrepreneurs and <br />
            Professionals
          </Heading>
        </Flex>

        <Flex direction="column" gap="3rem" py="3rem" mx="20rem">
          <HStack spacing={5}>
            <Button
              sx={sortBtnsStyle}
              onClick={() => filterArticlesByCategory(null)}
            >
              All
            </Button>
            {mainCategories.map((category, index) => (
              <Button
                key={index}
                sx={sortBtnsStyle}
                onClick={() => filterArticlesByCategory(category)}
              >
                {articles[category].title}
              </Button>
            ))}
          </HStack>
          <Grid templateColumns="repeat(3, 1fr)" gap={5}>
            {filteredArticles.map((article, index) => (
              <GridItem key={index}>
                <Flex direction="column">
                  <Img
                    src={article.img}
                    alt="Article image"
                    objectFit="cover"
                    borderRadius="1rem"
                    w="100%"
                    aspectRatio="7/4"
                  />
                  <VStack align="flex-start">
                    <Text fontWeight={500} fontSize="1.25rem" pt={1}>
                      {article.title}
                    </Text>
                    <Text>
                      {`${article.text.split(" ").slice(0, 25).join(" ")}...`}
                    </Text>
                    <Button
                      variant="link"
                      color="var(--cyan)"
                      _hover={{ textDecoration: "none", opacity: "0.8" }}
                      ref={btnRef}
                      onClick={() => openModal(article)}
                    >
                      Learn more
                    </Button>
                  </VStack>
                </Flex>
              </GridItem>
            ))}
          </Grid>
        </Flex>
        <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="inside">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {selectedArticle && selectedArticle.title}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>{selectedArticle && selectedArticle.text}</ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default RecommendationsPage;
