import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import LoaderSpinner from "../../../components/LoaderSpinner/LoaderSpinner";
import PetCard from "../PetCard/PetCard";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Pets() {
  const axiosPublic = useAxiosPublic();
  let params = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(params?.category || "all");
  console.log(category);
  const {
    data: pets,
    refetch,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["pets", category],
    queryFn: async () => {
      const res = await axiosPublic.get(`/pets?category=${category || "all"}`);
      return res.data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    refetch();
    if (category !== params?.category) {
      navigate(`/pets/${category}`, { replace: true });
    }
  }, [category, refetch, navigate, params?.category]);
  if (isLoading || isFetching) {
    return <LoaderSpinner />;
  }
  return (
    <div>
      <div>
        <div className="flex justify-center my-5">
          <div className="lg:flex">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered mr-3 w-full max-w-xs"
            />
            <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className="w-full btn m-1">
                Select A Category
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <button onClick={() => setCategory("all")}>All</button>
                </li>
                <li>
                  <button onClick={() => setCategory("dog")}>Dog</button>
                </li>
                <li>
                  <button onClick={() => setCategory("cat")}>Cat</button>
                </li>
                <li>
                  <button onClick={() => setCategory("bird")}>Bird</button>
                </li>
                <li>
                  <button onClick={() => setCategory("small pet")}>
                    Small Pet
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-orange-400 text-center mb-5">
            Pet Category: {category.toUpperCase()}
          </h2>
        </div>
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {pets.map((pet) => (
          <PetCard key={pet._id} pet={pet} />
        ))}
      </div>
    </div>
  );
}

export default Pets;
