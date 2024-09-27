import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

function usePetDetails(petId) {
  const axiosSecure = useAxiosSecure();
  const {
    data: petDetails,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["petDetails", petId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/pets/details/${petId}`);
      return res.data;
    },
    enabled: !!petId,
    refetchOnWindowFocus: false,
  });
  return { petDetails, isLoading, isFetching, refetch, isError };
}

export default usePetDetails;
