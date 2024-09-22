import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

function AdoptModal({ petDetails, refetch }) {
  const { user } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const axiosPublic = useAxiosPublic();
  const {
    pet_name,
    pet_image,
    pet_category,
    pet_age,
    pet_location,
    pet_description,
    owner_info,
  } = petDetails;

  const handleAdopt = (e) => {
    e.preventDefault();

    const adoptInfo = {
      requester_id: user.uid,
      pet_id: petDetails._id,
      request_date: new Date(),
      status: "pending",
      requester_info: {
        phone: phoneNumber,
        address: address,
      },
    };
    axiosPublic.post("/pet-request", adoptInfo).then((res) => {
      if (res.data.insertedId) {
        document.getElementById("my_modal_5").close();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your request has been sent",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box relative">
        {/* X Button to close the modal */}
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={() => document.getElementById("my_modal_5").close()}
        >
          ✕
        </button>

        {/* Modal content */}
        <div className="flex flex-col items-center text-center">
          <h3 className="text-2xl font-bold text-orange-500">
            Adopt {pet_name}!
          </h3>
          <img
            src={pet_image}
            alt={pet_name}
            className="w-32 h-32 rounded-full my-4 border-4 border-orange-300"
          />
          <p className="text-lg font-medium">
            {pet_category} | {pet_age} years old
          </p>
          <p className="text-gray-500">{pet_location}</p>
          <p className="py-4 text-gray-700">{pet_description}</p>
          <div>
            <h3 className="text-lg font-semibold">Current Owner</h3>
            <p className="text-md">{owner_info.name}</p>
            <p className="text-md">{owner_info.email}</p>
          </div>
          {/* User Information */}
          <div className="w-full text-left my-4">
            <p className="text-sm text-gray-500">
              <strong>Name:</strong> {user?.displayName || "Anonymous"}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Email:</strong> {user?.email || "No Email Provided"}
            </p>
            <form onSubmit={handleAdopt}>
              <label className="block mt-2">
                <strong>Phone Number:</strong>
                <input
                  required
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  className="input input-bordered w-full mt-1"
                />
              </label>
              <label className="block mt-2">
                <strong>Address:</strong>
                <input
                  required
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Full address"
                  className="input input-bordered w-full mt-1"
                />
              </label>
              <button className="btn btn-primary border-0 text-white bg-orange-500 hover:bg-orange-800 w-full py-3 font-bold">
                Request Adoption
              </button>
            </form>
          </div>

          {/* Adoption Confirmation */}
        </div>
      </div>
    </dialog>
  );
}

export default AdoptModal;
