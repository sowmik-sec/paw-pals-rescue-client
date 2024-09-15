import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
      <div className="max-w-lg mx-auto">
        <img
          src="https://i.imgur.com/qIufhof.png" // A cute image of a sad pet
          alt="Lost Pet"
          className="w-64 h-64 mx-auto"
        />
        <h1 className="text-6xl font-bold text-orange-500 mt-6">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4">
          Oops! The page you are looking for does not exist.
        </h2>
        <p className="text-gray-600 mt-2">
          It looks like one of our furry friends has wandered off with the page!
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300"
        >
          Take Me Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
