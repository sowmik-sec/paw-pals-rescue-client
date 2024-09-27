import { useNavigate } from "react-router-dom";

function DonationCampaignCard({ campaign }) {
  const {
    pet_name,
    max_donation,
    short_description,
    last_date,
    pet_image,
    totalAmount,
  } = campaign;
  const navigate = useNavigate();
  const handleDonationDetails = (id) => {
    navigate(`/donation-details/${id}`);
  };
  return (
    <div className="card bg-base-100 w-96 shadow-xl mx-auto">
      <figure>
        <img className="" src={pet_image} alt="pet image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{pet_name}</h2>
        <p>{short_description.split("", 40)}...</p>
        <div className="card-actions justify-items-start">
          <div className="badge badge-outline">
            Max donation: {max_donation}
          </div>
          <div className="badge badge-outline">
            Total Donation Collected: ${totalAmount ? totalAmount : 0}
          </div>
          <div className="badge badge-outline">Last date: {last_date}</div>
        </div>
        <div className="card-actions justify-center mt-5">
          <button
            onClick={() => handleDonationDetails(campaign._id)}
            className="btn btn-primary bg-orange-500 border-t-0 border-x-0 hover:bg-orange-700 text-white"
          >
            Show details
          </button>
        </div>
      </div>
    </div>
  );
}

export default DonationCampaignCard;
