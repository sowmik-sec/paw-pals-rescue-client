import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoaderSpinner from "../../../components/LoaderSpinner/LoaderSpinner";
import MyDonationCampaignRow from "./MyDonationCampaignRow";

function MyDonationCampaign() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: myCampaigns,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myDonationCampaigns", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-donation-campaigns?email=${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <LoaderSpinner />;
  }
  if (isError) {
    return (
      <h2>Something went wrong or you do not have any donation campaign</h2>
    );
  }
  if (myCampaigns?.length === 0) {
    return <h3 className="text-3xl">You have no donation campaign.</h3>;
  }
  console.log(myCampaigns);
  return (
    <div>
      <h2 className="text-4xl">My donation campaigns</h2>
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
              <th>Max Donation</th>
              <th>Total Donation</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {myCampaigns?.map((campaign, index) => (
              <MyDonationCampaignRow
                key={campaign._id}
                campaign={campaign}
                index={index + 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyDonationCampaign;
