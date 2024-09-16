import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";

function Home() {
  return (
    <div>
      <Helmet>
        <title>Paw Pals Rescue | Home</title>
      </Helmet>
      <Banner />
    </div>
  );
}

export default Home;
