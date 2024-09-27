import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoaderSpinner from "../../../components/LoaderSpinner/LoaderSpinner";
import { Helmet } from "react-helmet-async";

function AllDonations() {
  const axiosSecure = useAxiosSecure();
  const {
    data: donationCampaigns,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["donationData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-donations");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (error) {
    return <p>Error loading data</p>;
  }

  if (donationCampaigns?.length === 0) {
    return <h2 className="text-4xl">There is no donations to show</h2>;
  }

  return (
    <div className="container mx-auto p-5 md:p-10">
      <Helmet>
        <title>Paw Pals Rescue | Dashboard - All Donations</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">All Donations</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium">
            <tr>
              <th scope="col" className="px-6 py-4">
                Campaign Name
              </th>
              <th scope="col" className="px-6 py-4">
                Total Donations
              </th>
              <th scope="col" className="px-6 py-4">
                Donors
              </th>
              <th scope="col" className="px-6 py-4">
                Donor Details
              </th>
            </tr>
          </thead>
          <tbody>
            {donationCampaigns?.map((campaign) => (
              <tr key={campaign._id} className="border-b">
                <td className="px-6 py-4">{campaign.pet_name}</td>
                <td className="px-6 py-4">${campaign.totalDonations || 0}</td>
                <td className="px-6 py-4">
                  {campaign.donors?.length
                    ? campaign.donors.join(", ")
                    : "No Donors"}
                </td>
                <td className="px-6 py-4">
                  {campaign.donationsDetail?.length ? (
                    <ul>
                      {campaign.donationsDetail.map((donation, index) => (
                        <li key={index} className="border-b">
                          <p>Email: {donation.email}</p>
                          <p>Donation: ${donation.donation}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No donations yet</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllDonations;
