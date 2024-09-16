import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import LoaderSpinner from "../../../components/LoaderSpinner/LoaderSpinner";
import PetCard from "../PetCard/PetCard";

function Pets() {
  const axiosPublic = useAxiosPublic();
  const { data: pets, isLoading } = useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const res = await axiosPublic.get("/pets");
      return res.data;
    },
  });
  if (isLoading) {
    return <LoaderSpinner />;
  }
  return (
    <div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {pets.map((pet) => (
          <PetCard key={pet._id} pet={pet} />
        ))}
      </div>
    </div>
  );
}

export default Pets;
