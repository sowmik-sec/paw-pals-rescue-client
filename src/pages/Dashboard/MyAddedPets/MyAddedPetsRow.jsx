function MyAddedPetsRow({ pet, index }) {
  console.log(pet);
  return (
    <tr>
      <th>
        <label>{index + 1}</label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={pet.pet_image} alt="pet image" />
            </div>
          </div>
          <div>
            <div className="font-bold">{pet.pet_name}</div>
            <div className="text-sm opacity-50">{pet.pet_category}</div>
          </div>
        </div>
      </td>
      <td>
        {!pet?.requestDetails?.status
          ? "available"
          : pet?.requestDetails?.status}
      </td>
      <td>
        <button className="btn btn-primary">Update</button>
      </td>
      <td>
        <button
          className="btn btn-success"
          disabled={!pet?.requestDetails?.status}
        >
          Mark as Adopted
        </button>
      </td>
      <td>
        <button className="btn btn-error">Delete</button>
      </td>
    </tr>
  );
}

export default MyAddedPetsRow;
