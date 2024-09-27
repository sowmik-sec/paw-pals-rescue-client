import { useNavigate } from "react-router-dom";

function AllDonationCampaignsRow({ campaign, index }) {
  const { pet_name, pet_image, max_donation, totalAmount } = campaign;
  const navigate = useNavigate();
  return (
    <tr>
      <th>
        <label>{index + 1}</label>
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
      <td>
        <button
          className="btn btn-sm btn-info"
          onClick={() => navigate(`/donation-details/${campaign._id}`)}
        >
          Details
        </button>
      </td>
    </tr>
  );
}

export default AllDonationCampaignsRow;
