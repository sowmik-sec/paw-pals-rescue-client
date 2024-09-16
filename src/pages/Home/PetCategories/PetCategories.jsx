import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import PetCategoryCard from "./PetCategoryCard";
import LoaderSpinner from "../../../components/LoaderSpinner/LoaderSpinner";
import { useEffect, useState } from "react";

function PetCategories() {
  const axiosPublic = useAxiosPublic();
  const [isMore, setIsMore] = useState(false);

  const { data: allCategories, isPending } = useQuery({
    queryKey: ["petCategories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/pet-categories");
      return res.data;
    },
  });

  const [categories, setCategories] = useState(allCategories?.slice(0, 3));
  useEffect(() => {
    if (isMore) {
      setCategories(allCategories);
    } else {
      setCategories(allCategories?.slice(0, 3));
    }
  }, [isMore, allCategories]);
  if (isPending) {
    return <LoaderSpinner />;
  }
  return (
    <div className=" py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-orange-500 mb-8">
          Browse by Pet Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories?.map((category) => (
            <PetCategoryCard category={category} key={category._id} />
          ))}
        </div>
        <div className="flex justify-center mt-5">
          <button
            onClick={() => setIsMore(!isMore)}
            className="px-3 py-2 rounded-md text-white bg-orange-400"
          >
            {isMore ? "Show Less Category" : "Show More Category"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PetCategories;
