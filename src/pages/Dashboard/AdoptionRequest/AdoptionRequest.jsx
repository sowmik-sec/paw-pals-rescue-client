import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoaderSpinner from "../../../components/LoaderSpinner/LoaderSpinner";
import AdoptionRequestRow from "./AdoptionRequestRow";
import Swal from "sweetalert2";

function AdoptionRequest() {
  const axiosSecure = useAxiosSecure();
  const {
    data: adoptionRequests,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["adoptionRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/adoption-requests");
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
  if (isLoading) {
    return <LoaderSpinner />;
  }
  if (isError) {
    return (
      <h2 className="text-4xl font-bold text-red-400">
        Something went wrong while fetching data
      </h2>
    );
  }
  return (
    <div>
      <h2 className="text-4xl mb-4">All Adoption Requests</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <h3 className="text-3xl">#</h3>
                </label>
              </th>
              <th>Pet</th>
              <th>Status</th>
              <th>Mark as adopted</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {adoptionRequests.map((request, index) => (
              <AdoptionRequestRow
                key={request._id}
                request={request}
                index={index}
                handleMarkAsAdopted={handleMarkAsAdopted}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdoptionRequest;
