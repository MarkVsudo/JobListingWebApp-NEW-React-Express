import { Helmet } from "react-helmet";
import Hero from "../components/HomeComponents/Hero";
import JobCategories from "../components/HomeComponents/JobCategories";
import Process from "../components/HomeComponents/Process";
import Companies from "../components/HomeComponents/Companies";
import LearnFromExperts from "../components/HomeComponents/LearnFromExperts";
import OurMission from "../components/HomeComponents/OurMission";
import Vocation from "../components/HomeComponents/Vocation";

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
      <OurMission />
      <Vocation />
    </>
  );
}

export default HomePage;
