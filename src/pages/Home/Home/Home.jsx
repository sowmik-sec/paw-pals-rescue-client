import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import PetCategories from "../PetCategories/PetCategories";

function Home() {
  return (
    <div>
      <Helmet>
        <title>Paw Pals Rescue | Home</title>
      </Helmet>
      <Banner />
      <PetCategories />
    </div>
  );
}

export default Home;
