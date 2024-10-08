import { useParams } from "react-router-dom";
import LoaderSpinner from "../../../components/LoaderSpinner/LoaderSpinner";
import AdoptModal from "../../../components/AdoptModal/AdoptModal";
import usePetDetails from "../../../hooks/usePetDetails";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

function PetDetails() {
  const params = useParams();
  const { user } = useAuth();
  const { petDetails, isLoading, isFetching, refetch } = usePetDetails(
    params.id
  );
  if (isLoading || isFetching) {
    return <LoaderSpinner />;
  }
  const {
    pet_name,
    pet_image,
    pet_category,
    pet_age,
    pet_location,
    posted_date,
    pet_description,
    owner_info,
    requestDetails,
  } = petDetails;
  return (
    <div className="max-w-4xl mx-auto p-5 mt-10 shadow-lg rounded-lg">
      <Helmet>
        <title>Paw Pals Rescue | Pet Details </title>
      </Helmet>
      <AdoptModal petDetails={petDetails} refetch={refetch} />
      {/* Pet Image */}
      <div className="flex justify-center">
        <img
          src={pet_image}
          alt={pet_name}
          className="w-full h-full object-cover rounded-lg mb-6"
        />
      </div>

      {/* Pet Info */}
      <div className="text-center">
        <h1 className="text-4xl font-bold">{pet_name}</h1>
        <p className="text-lg mt-2">{pet_category}</p>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <h3 className="text-lg font-semibold">Age</h3>
          <p className="text-md">{pet_age} years</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Location</h3>
          <p className="text-md">{pet_location}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Current Owner</h3>
          <p className="text-md">{owner_info?.name}</p>
          <p className="text-md">{owner_info?.email}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Posted Date</h3>
          <p className="text-md">
            {new Date(posted_date).toLocaleDateString()}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Adoption Status</h3>
          <div
            className={`text-md w-24 text-center px-2 py-1 rounded-md text-black ${
              requestDetails?.status === "pending"
                ? "bg-violet-300"
                : requestDetails?.status === "adopted"
                ? "bg-purple-500"
                : "bg-green-500 text-white"
            }`}
          >
            <p>{requestDetails?.status || "available"}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Description</h3>
        <p className="text-md mt-2">{pet_description}</p>
      </div>

      {/* Call to Action */}
      <div className="flex justify-center mt-10">
        <button
          disabled={user?.email === owner_info.email || requestDetails?.status}
          onClick={() => document.getElementById("my_modal_5").showModal()}
          className="btn btn-outline hover:bg-orange-700 border-0 text-white bg-orange-500 px-6 py-3 text-lg rounded-lg"
        >
          Adopt {pet_name}
        </button>
      </div>
    </div>
  );
}

export default PetDetails;
