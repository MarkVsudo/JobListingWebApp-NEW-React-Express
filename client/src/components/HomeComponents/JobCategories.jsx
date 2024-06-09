import { Fragment, useRef, useEffect } from "react";
import { Heading, Img, Flex, Text, Grid, GridItem } from "@chakra-ui/react";
import CategoryImgIT from "../../assets/it-category-img.svg";
import CategoryImgRealEstate from "../../assets/house-category-img.svg";
import CategoryImgEducation from "../../assets/book-category-img.svg";
import CategoryImgEngineering from "../../assets/engineering-category-img.svg";
import CategoryImgFinance from "../../assets/finance-category-img.svg";
import CategoryImgRestaurant from "../../assets/restaurant-category-img.svg";
import CategoryImgMarketing from "../../assets/marketing-category-img.svg";
import CategoryImgHR from "../../assets/hr-category-img.svg";
import EllipseCategories from "../../assets/ellipse-background-categories.svg";
import HomeButton from "./HomeButton";
import { gsap } from "gsap";

const jobCategories = [
  {
    src: CategoryImgIT,
    alt: "IT Category",
    title: "Information Technology (IT)",
    jobs: 525,
  },
  {
    src: CategoryImgRealEstate,
    alt: "Real Estate Category",
    title: "Real Estate Business",
    jobs: 120,
  },
  {
    src: CategoryImgEducation,
    alt: "Education Category",
    title: "Education",
    jobs: 300,
  },
  {
    src: CategoryImgEngineering,
    alt: "Engineering Category",
    title: "Engineering",
    jobs: 210,
  },
  {
    src: CategoryImgFinance,
    alt: "Finance Category",
    title: "Finance & Banking",
    jobs: 180,
  },
  {
    src: CategoryImgRestaurant,
    alt: "Restaurant Category",
    title: "Restaurant Services",
    jobs: 90,
  },
  {
    src: CategoryImgMarketing,
    alt: "Marketing Category",
    title: "Marketing & Advertising",
    jobs: 140,
  },
  {
    src: CategoryImgHR,
    alt: "HR Category",
    title: "Human Resources (HR)",
    jobs: 75,
  },
];

const JobCategories = () => {
  const ellipseRef = useRef(null);

  useEffect(() => {
    gsap.to(ellipseRef.current, {
      y: 20,
      duration: 1.5,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      color="var(--dark-blue)"
      pos="relative"
    >
      <Heading as="h2" size="2xl" fontWeight={500} pb={3}>
        Find the job which suits you the best
      </Heading>
      <Heading as="h2" size="lg" fontWeight={200}>
        There are 50+ job categories available
      </Heading>
      <Grid templateColumns="repeat(4, 1fr)" gap={10} p={5} my="2rem">
        {jobCategories.map((category, index) => (
          <GridItem
            key={index}
            bg="white"
            p="1.25rem 2rem"
            justifyContent="space-between"
            alignContent="center"
            borderRadius="12px"
            boxShadow="var(--box-shadow)"
            cursor="pointer"
            transition="all 250ms ease-in-out"
            role="group"
            _hover={{
              bg: "var(--dark-blue)",
              color: "white",
              transform: "translateY(-10px)",
            }}
          >
            <Flex d="flex" gap="5rem" justifyContent="space-between">
              <Img
                src={category.src}
                alt={category.alt}
                transform="scale(1.2)"
                transition="filter 250ms ease-in-out"
                _groupHover={{
                  filter: "invert(1)",
                }}
              />
              <Text fontWeight={700}>
                {category.title.split(" ").map((word, idx) => (
                  <Fragment key={idx}>
                    {word} <br />
                  </Fragment>
                ))}
                <Text as="span" opacity=".8" fontWeight={500}>
                  {category.jobs} jobs
                </Text>
              </Text>
            </Flex>
          </GridItem>
        ))}
      </Grid>
      <HomeButton title="Explore all categories" />
      <Img
        ref={ellipseRef}
        src={EllipseCategories}
        alt="Categories section image"
        pos="absolute"
        right="-5rem"
        bottom="-5rem"
        w="25%"
        zIndex="-1"
      />
    </Flex>
  );
};

export default JobCategories;
