import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoaderSpinner from "../../../components/LoaderSpinner/LoaderSpinner";
import MyAddedPetsRow from "./MyAddedPetsRow";

function MyAddedPets() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: myPets,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myPets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-pets?email=${user?.email}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <LoaderSpinner />;
  }
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <h2 className="text-3xl">#</h2>
              </label>
            </th>
            <th>Name</th>
            <th>Job</th>
            <th>Update</th>
            <th>Mark as Adopted</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {myPets.map((pet, index) => (
            <MyAddedPetsRow key={index} index={index} pet={pet} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyAddedPets;
