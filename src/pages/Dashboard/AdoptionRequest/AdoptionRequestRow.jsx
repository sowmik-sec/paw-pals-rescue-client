import { useNavigate } from "react-router-dom";

function AdoptionRequestRow({ request, index, handleMarkAsAdopted }) {
  const { pet_image, pet_name, pet_category, petRequests } = request;
  const status = petRequests[0]?.status;
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
              <img src={pet_image} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{pet_name}</div>
            <div className="text-sm opacity-50">{pet_category}</div>
          </div>
        </div>
      </td>
      <td>{status}</td>
      <td>
        <button
          onClick={() => handleMarkAsAdopted(request._id)}
          disabled={status === "adopted"}
          className="btn btn-success"
        >
          Mark As Adopted
        </button>
      </td>
      <th>
        <button
          onClick={() => navigate(`/pets/details/${request._id}`)}
          className="btn btn-ghost btn-xs"
        >
          details
        </button>
      </th>
    </tr>
  );
}

export default AdoptionRequestRow;
