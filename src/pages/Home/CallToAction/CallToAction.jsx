import { Link } from "react-router-dom";

function CallToAction() {
  return (
    <section className=" py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        {/* Image Section */}
        <div className="lg:w-1/2">
          <img
            src="https://img.freepik.com/premium-photo/pets-thanksgiving-capture-adorable-heartwarming-moments-pets-dressed-thanksgivingthe_884243-707.jpg"
            alt="Happy adopted pet"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Text and Button Section */}
        <div className="lg:w-1/2 lg:pl-12 mt-8 lg:mt-0 text-center lg:text-left">
          <h2 className="text-4xl font-bold text-orange-500">
            Make a Difference Today
          </h2>
          <p className="mt-4 text-lg">
            Adopt a pet and give them the loving home they deserve. Every pet
            deserves a chance at a happy life. By adopting, you are not just
            rescuing a pet, you are gaining a lifelong friend.
          </p>
          <Link
            to="/adopt"
            className="mt-6 inline-block px-8 py-3 bg-orange-500 text-white rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors duration-300"
          >
            Adopt Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
