import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import PetCategories from "../PetCategories/PetCategories";
import CallToAction from "../CallToAction/CallToAction";
import AboutUs from "../AboutUs/AboutUs";
import VolunteerDonate from "../VolunTeerDonate/VolunTeerDonate";

function Home() {
  return (
    <div>
      <Helmet>
        <title>Paw Pals Rescue | Home</title>
      </Helmet>
      <Banner />
      <PetCategories />
      <CallToAction />
      <AboutUs />
      <VolunteerDonate />
    </div>
  );
}

export default Home;
