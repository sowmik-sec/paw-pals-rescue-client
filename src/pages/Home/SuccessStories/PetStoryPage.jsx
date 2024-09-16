import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import LoaderSpinner from "../../../components/LoaderSpinner/LoaderSpinner";

function PetStoryPage() {
  const params = useParams();
  const axiosPublic = useAxiosPublic();
  const { data: story, isLoading } = useQuery({
    queryKey: ["story", params.id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/stories/${params.id}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <LoaderSpinner />;
  }
  if (!story) {
    return (
      <h2 className="text-3xl font-bold text-center">Story did not found</h2>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-16">
      <img
        src={story.image}
        alt={story.name}
        className="w-full h-[400px] object-cover rounded-lg mb-6"
      />
      <h1 className="text-4xl font-bold text-orange-500 mb-4">
        {story.name}&apos;s Story
      </h1>
      <p className="text-lg">{story.story}</p>
    </div>
  );
}

export default PetStoryPage;
