import { useNavigate } from "react-router-dom";

function MyDonationCampaignRow({ campaign, index }) {
  const { pet_name, max_donation, pet_image, totalAmount } = campaign;
  const navigate = useNavigate();
  const handleViewDetails = (id) => {
    navigate(`/donation-details/${id}`);
  };
  return (
    <tr>
      <th>
        <label>
          <h3 className="text-xl">{index}</h3>
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={pet_image} alt="pet image" />
            </div>
          </div>
          <div>
            <div className="font-bold">{pet_name}</div>
          </div>
        </div>
      </td>
      <td>{max_donation}</td>
      <td>{totalAmount}</td>
      <th>
        <button
          onClick={() => handleViewDetails(campaign._id)}
          className="btn btn-primary text-white border-t-0 border-x-0 bg-orange-500 hover:bg-orange-700"
        >
          View details
        </button>
      </th>
    </tr>
  );
}

export default MyDonationCampaignRow;
