import { Helmet } from "react-helmet";
import Hero from "../components/HomeComponents/Hero";

function HomePage() {
  return (
    <div>
      <Helmet>
        <title>JobConqueror - Home</title>
      </Helmet>
      <Hero />
    </div>
  );
}

export default HomePage;
