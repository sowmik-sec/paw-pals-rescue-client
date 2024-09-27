import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoaderSpinner from "../../../components/LoaderSpinner/LoaderSpinner";
import MyAddedPetsRow from "./MyAddedPetsRow";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

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
            if (res.data?.acknowledged) {
              Swal.fire({
                title: "Thank you",
                text: "You made it adopted.",
                icon: "success",
              });
              refetch();
            }
          })
          .catch((err) => console.error(err));
      }
    });
  };

  const handleDeletePet = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/delete-pet/${id}`).then((res) => {
          if (res.data.deletedCount === 1) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  if (myPets?.length === 0) {
    return <h2 className="text-4xl font-bold">You did not add any pets</h2>;
  }

  if (isLoading) {
    return <LoaderSpinner />;
  }
  return (
    <div className="overflow-x-auto">
      <Helmet>
        <title>Paw Pals Rescue | Dashboard - My Added Pets</title>
      </Helmet>
      <h2 className="text-3xl">My Total added pets: {myPets.length}</h2>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <h2 className="text-3xl">#</h2>
              </label>
            </th>
            <th>Pet</th>
            <th>Status</th>
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
              handleDeletePet={handleDeletePet}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyAddedPets;
