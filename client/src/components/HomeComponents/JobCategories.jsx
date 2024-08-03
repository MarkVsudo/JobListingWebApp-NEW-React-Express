import { Fragment, useRef, useEffect } from "react";
import {
  Heading,
  Img,
  Flex,
  Text,
  Grid,
  GridItem,
  useBreakpointValue,
} from "@chakra-ui/react";
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
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const containerRef = useRef(null);

  const gridColumns = useBreakpointValue({
    base: 1,
    sm: 2,
    md: 2,
    lg: 3,
    xl: 4,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const h2Elements = container.querySelectorAll("h2");
    const gridElement = container.querySelector(".job-categories-grid");
    const buttonElement = container.querySelector(".home-button-wrapper");

    gsap.set([...h2Elements, gridElement, buttonElement], {
      opacity: 0,
      y: -50,
    });

    ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      onEnter: () => {
        gsap.to(h2Elements[0], { opacity: 1, y: 0, duration: 0.4 });
        gsap.to(h2Elements[1], { opacity: 1, y: 0, duration: 0.4, delay: 0.4 });
        gsap.to(gridElement, { opacity: 1, y: 0, duration: 0.7, delay: 0.8 });
        gsap.to(buttonElement, { opacity: 1, y: 0, duration: 0.4, delay: 1.2 });
      },
      once: true,
    });

    gsap.to(container.querySelector(".background-ellipse"), {
      y: 20,
      duration: 1.5,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <Flex
      ref={containerRef}
      direction="column"
      alignItems="center"
      justifyContent="center"
      color="var(--dark-blue)"
      pos="relative"
    >
      <Heading
        as="h2"
        size="xl"
        fontWeight={500}
        pb={3}
        textAlign="center"
        fontSize={{ base: "1.5rem", md: "1.875rem" }}
      >
        Find the job which suits you the best
      </Heading>
      <Heading as="h2" size={{ base: "sm", md: "md" }} fontWeight={200}>
        There are 50+ job categories available
      </Heading>
      <Grid
        className="job-categories-grid"
        templateColumns={`repeat(${gridColumns}, 1fr)`}
        gap={{ base: 5, md: 6, lg: 7, xl: 8, "2xl": 9 }}
        p={5}
        my={{ base: "1rem", md: "2rem" }}
      >
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
            minHeight="8rem"
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
      <div className="home-button-wrapper">
        <HomeButton title="Explore all categories" />
      </div>
      <Img
        className="background-ellipse"
        src={EllipseCategories}
        alt="Categories section image"
        pos="absolute"
        right={{ base: "unset", "2xl": "-5rem" }}
        left={{ base: "-5rem", "2xl": "unset" }}
        bottom={{
          lg: "13rem",
          xl: "1rem",
          "2xl": "-5rem",
        }}
        w="25%"
        zIndex="-1"
        display={{ base: "none", lg: "block" }}
      />
    </Flex>
  );
};

export default JobCategories;
