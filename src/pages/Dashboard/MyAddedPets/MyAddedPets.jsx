import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoaderSpinner from "../../../components/LoaderSpinner/LoaderSpinner";
import MyAddedPetsRow from "./MyAddedPetsRow";
import Swal from "sweetalert2";

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

  const handleMarkAsAdopted = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes let it be adopted",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/make-adopted/${id}`)
          .then((res) => {
            console.log(res);
            Swal.fire({
              title: "Thank you",
              text: "You made it adopted.",
              icon: "success",
            });
            refetch();
          })
          .catch((err) => console.error(err));
      }
    });
  };

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
            <MyAddedPetsRow
              key={index}
              index={index}
              pet={pet}
              handleMarkAsAdopted={handleMarkAsAdopted}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyAddedPets;
