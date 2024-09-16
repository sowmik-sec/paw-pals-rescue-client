import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import LoaderSpinner from "../../../components/LoaderSpinner/LoaderSpinner";
import { Link } from "react-router-dom";

function SuccessStories() {
  const axiosPublic = useAxiosPublic();
  const { data: stories, isLoading } = useQuery({
    queryKey: ["successStories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/success-stories");
      return res.data;
    },
  });
  if (isLoading) {
    return <LoaderSpinner />;
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-orange-500 mb-6">Happy Tails</h2>
        <p className="text-lg mb-10">
          These heartwarming stories are a testament to the impact of our rescue
          efforts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.slice(0, 3).map((story, index) => (
            <div key={index} className="rounded-lg shadow-lg p-6">
              <img
                src={story.image}
                alt={story.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h3 className="text-2xl font-semibold mt-4">{story.name}</h3>
              <p className="mt-2">{story.story}</p>
              <Link
                to={`/stories/${story._id}`}
                className="inline-block mt-4 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
              >
                Read Full Story
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SuccessStories;
