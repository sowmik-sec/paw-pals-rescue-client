import { FaDonate, FaHeart, FaSearch } from "react-icons/fa";

function AboutUs() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-orange-500 mb-4">
            About Paw Pals Rescue
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Paw Pals Rescue is a platform dedicated to helping abandoned and
            rescued pets find loving homes. We aim to connect pets with caring
            individuals and families while raising awareness about animal
            adoption and the importance of giving every pet a chance at a better
            life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* First Column: How the website works */}
          <div className="rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl text-orange-500 mb-4 flex justify-center">
              <FaSearch />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Browse Pets</h3>
            <p className="">
              Explore the list of adorable pets available for adoption and find
              your new best friend.
            </p>
          </div>

          {/* Second Column: Why it was made */}
          <div className=" rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl text-orange-500 mb-4 flex justify-center">
              <FaHeart />
            </div>
            <h3 className="text-2xl font-semibold  mb-2">Why We Exist</h3>
            <p className="">
              Paw Pals Rescue was created to help animals in need find a safe,
              loving home. We believe every pet deserves a second chance.
            </p>
          </div>

          {/* Third Column: Adoption and donations */}
          <div className=" rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl text-orange-500 mb-4 flex justify-center">
              <FaDonate />
            </div>
            <h3 className="text-2xl font-semibold  mb-2">Get Involved</h3>
            <p className="">
              Adopt a pet, support our adoption campaigns, or make a donation to
              help us continue rescuing and saving lives.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <a
            href="/adopt"
            className="inline-block px-8 py-3 bg-orange-500 text-white rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors duration-300"
          >
            Start Your Adoption Journey
          </a>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
