import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

function usePetDetails(petId) {
  const axiosPublic = useAxiosPublic();
  const {
    data: petDetails,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["petDetails", petId],
    queryFn: async () => {
      const res = await axiosPublic.get(`/pets/details/${petId}`);
      return res.data;
    },
    enabled: !!petId,
    refetchOnWindowFocus: false,
  });
  return { petDetails, isLoading, isFetching, refetch, isError };
}

export default usePetDetails;
