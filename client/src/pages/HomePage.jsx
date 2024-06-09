import { Helmet } from "react-helmet";
import Hero from "../components/HomeComponents/Hero";
import JobCategories from "../components/HomeComponents/JobCategories";
import Process from "../components/HomeComponents/Process";

function HomePage() {
  return (
    <div>
      <Helmet>
        <title>JobConqueror - Home</title>
      </Helmet>
      <Hero />
      <JobCategories />
      <Process />
    </div>
  );
}

export default HomePage;
