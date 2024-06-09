import { Helmet } from "react-helmet";
import Hero from "../components/HomeComponents/Hero";
import JobCategories from "../components/HomeComponents/JobCategories";
import Process from "../components/HomeComponents/Process";
import Companies from "../components/HomeComponents/Companies";
import LearnFromExperts from "../components/HomeComponents/LearnFromExperts";

function HomePage() {
  return (
    <>
      <Helmet>
        <title>JobConqueror - Home</title>
      </Helmet>
      <Hero />
      <JobCategories />
      <Process />
      <Companies />
      <LearnFromExperts />
    </>
  );
}

export default HomePage;
