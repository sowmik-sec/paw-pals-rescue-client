import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoaderSpinner from "../../../components/LoaderSpinner/LoaderSpinner";

function MyDonations() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: myDonations, isLoading } = useQuery({
    queryKey: ["myDonations", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-donations?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoaderSpinner />;
  }

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">My Donations</h2>

      {myDonations?.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {myDonations.map((donation) => (
            <div key={donation._id} className="shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold">{donation.pet_name}</h3>
              <p className="text-lg">
                Total Donation: ${donation.totalUserDonation}
              </p>

              <div className="mt-4">
                <h4 className="font-semibold">Donation Details:</h4>
                <ul>
                  {donation.donationDetails.map((detail, idx) => (
                    <li key={idx} className="mt-2">
                      <span className="font-bold">Amount:</span> $
                      {detail.donation} -
                      <span className="font-bold"> Date:</span>{" "}
                      {new Date(detail.donatedAt).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyDonations;
