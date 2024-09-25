import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoaderSpinner from "../../components/LoaderSpinner/LoaderSpinner";
import DonationCampaignCard from "./DonationCampaignCard";

function DonationCampaigns() {
  const axiosSecure = useAxiosSecure();
  const { data: donationCampaigns, isLoading } = useQuery({
    queryKey: ["donationCampaigns"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donation-campaigns");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoaderSpinner />;
  }
  return (
    <div className="my-20">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {donationCampaigns.map((campaign) => (
          <DonationCampaignCard key={campaign._id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}

export default DonationCampaigns;
