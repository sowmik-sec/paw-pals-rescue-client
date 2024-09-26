import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoaderSpinner from "../../components/LoaderSpinner/LoaderSpinner";
import useAuth from "../../hooks/useAuth";
import DonateModal from "../../components/DonateModal/DonateModal";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

function DonationDetails() {
  const { id } = useParams(); // Assuming you are passing donation ID through the route
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: donationDetails, isLoading } = useQuery({
    queryKey: ["donationDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-campaign/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoaderSpinner />;
  }

  const {
    pet_image,
    pet_name,
    max_donation,
    short_description,
    long_description,
    last_date,
    donation_created_at,
    creator_info: creator,
  } = donationDetails || {};

  return (
    <div className="container mx-auto p-5 md:p-10">
      <Elements stripe={stripePromise}>
        <DonateModal />
      </Elements>
      <div className="max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden">
        {/* Pet Image */}
        <img
          src={pet_image}
          alt={pet_name}
          className="w-full h-60 object-cover md:h-80"
        />

        <div className="p-6 md:p-8">
          {/* Pet Name */}
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{pet_name}</h2>

          {/* Short Description */}
          <p className="mb-6">{short_description}</p>

          {/* Donation Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-lg font-semibold">Maximum Donation:</p>
              <p className="text-xl font-bold text-orange-500">
                ${max_donation}
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold">Last Date to Donate:</p>
              <p className="text-xl font-bold text-orange-500">{last_date}</p>
            </div>
          </div>

          {/* Long Description */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="mt-4 leading-relaxed">{long_description}</p>
          </div>

          {/* Donation Creation Date */}
          <div className="mt-8 flex justify-between items-center">
            <p className="text-sm">
              Created at:{" "}
              <span className="font-semibold">{donation_created_at}</span>
            </p>
            <p className="text-sm">
              Campaign Creator:{" "}
              <span className="font-semibold">
                {creator?.name || "Unknown"}
              </span>
            </p>
          </div>

          {/* Donate Button */}
          <div className="mt-10 flex justify-center">
            <button
              disabled={creator?.email === user?.email}
              onClick={() =>
                document.getElementById("donate-modal").showModal()
              }
              className="btn btn-primary text-white bg-orange-500 hover:bg-orange-700 border-x-0 border-t-0 px-6 py-2 text-lg"
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonationDetails;
