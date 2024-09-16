import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import img1 from "../../../assets/banner1.webp";
import img2 from "../../../assets/banner2.webp";
function Banner() {
  return (
    <Carousel className="my-14">
      <div>
        <img src={img1} />
      </div>
      <div>
        <img src={img2} />
      </div>
      <div>
        <img src={img1} />
      </div>
    </Carousel>
  );
}

export default Banner;
