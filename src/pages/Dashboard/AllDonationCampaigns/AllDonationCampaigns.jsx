import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoaderSpinner from "../../../components/LoaderSpinner/LoaderSpinner";
import AllDonationCampaignsRow from "./AllDonationCampaignsRow";
import { Helmet } from "react-helmet-async";

function AllDonationCampaigns() {
  const axiosSecure = useAxiosSecure();
  const { data: campaigns, isLoading } = useQuery({
    queryKey: ["allDonationCampaigns"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-donation-campaigns");
      return res.data;
    },
  });
  if (isLoading) {
    return <LoaderSpinner />;
  }
  if (campaigns?.length === 0) {
    return <h2 className="text-4xl">There is no active donation campaign</h2>;
  }
  return (
    <div>
      <Helmet>
        <title>Paw Pals Rescue | Dashboard - All Donation Campaign</title>
      </Helmet>
      <h2 className="text-4xl">
        Total Donation Campaigns: {campaigns?.length}
      </h2>
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
              <th>Pet</th>
              <th>Max Donation Limit</th>
              <th>Donation Collected So far</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign, index) => (
              <AllDonationCampaignsRow
                key={campaign._id}
                campaign={campaign}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllDonationCampaigns;
