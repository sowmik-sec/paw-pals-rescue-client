import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoaderSpinner from "../../components/LoaderSpinner/LoaderSpinner";
import DonationCampaignCard from "./DonationCampaignCard";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

function DonationCampaigns() {
  const axiosSecure = useAxiosSecure();
  const limit = 10;
  const [donationCampaigns, setDonationCampaigns] = useState([]);
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ["donationCampaigns"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosSecure.get(
        `/donation-campaigns?page=${pageParam}&limit=${limit}`
      );
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (data) {
      const allCampaigns = data.pages.flatMap((page) => page.campaigns);
      setDonationCampaigns(allCampaigns);
    }
  }, [data]);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (isError) {
    return (
      <h2 className="text-4xl font-bold text-red-500">
        Something went wrong while retching data
      </h2>
    );
  }

  return (
    <div className="my-20">
      <Helmet>
        <title>Paw Pals Rescue | Donation Campaigns</title>
      </Helmet>
      {donationCampaigns?.length === 0 && (
        <h2 className="text-center my-5 text-red-500 font-bold text-4xl">
          No donation campaign is running
        </h2>
      )}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {donationCampaigns.map((campaign) => (
          <DonationCampaignCard key={campaign._id} campaign={campaign} />
        ))}
      </div>
      <div ref={loadMoreRef}>{isFetchingNextPage && <LoaderSpinner />}</div>
    </div>
  );
}

export default DonationCampaigns;
