import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import LoaderSpinner from "../../../components/LoaderSpinner/LoaderSpinner";
import PetCard from "../PetCard/PetCard";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

function Pets() {
  const axiosPublic = useAxiosPublic();
  let params = useParams();
  const navigate = useNavigate();
  const [searchTest, setSearchTest] = useState("");
  const [category, setCategory] = useState(params?.category || "all");
  const limit = 10;
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["pets", category],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosPublic.get(
        `/pets?category=${category}&page=${pageParam}&limit=${limit}`
      );
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const [filteredPets, setFilteredPets] = useState([]);

  // useEffect(() => {
  //   if (!params.category) {
  //     setCategory("all");
  //     refetch();
  //   } else {
  //     setCategory(params.category);
  //   }
  // }, [params, refetch]);

  // handle search and category changes
  useEffect(() => {
    if (searchTest) {
      const result = data?.pages
        .flatMap((page) => page.pets)
        .filter((pet) =>
          pet?.pet_name?.toLowerCase()?.includes(searchTest.toLowerCase())
        );
      setFilteredPets(result);
    } else {
      setFilteredPets(data?.pages.flatMap((page) => page.pets));
    }
  }, [data, searchTest]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    if (newCategory === "all") {
      navigate("/pets", { replace: true });
    } else {
      navigate(`/pets/${newCategory}`, { replace: true });
    }
  };

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <LoaderSpinner />;
  }
  if (isError) {
    return (
      <h2 className="text-4xl font-bold text-red-600">
        Something went wrong while retching data
      </h2>
    );
  }
  return (
    <div>
      <div className="sticky top-0 z-10 bg-gray-700 mb-10 shadow-md w-[450px] mx-auto rounded-md p-2">
        <div className="flex justify-center my-5">
          <div className="lg:flex">
            <input
              onChange={(e) => setSearchTest(e.target.value)}
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
                  <button onClick={() => handleCategoryChange("all")}>
                    All
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryChange("dog")}>
                    Dog
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryChange("cat")}>
                    Cat
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryChange("bird")}>
                    Bird
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryChange("small pet")}>
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
        {filteredPets?.map((pet) => (
          <PetCard key={pet._id} pet={pet} />
        ))}
      </div>
      <div ref={loadMoreRef}>{isFetchingNextPage && <LoaderSpinner />}</div>
    </div>
  );
}

export default Pets;
