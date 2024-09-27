import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import usePetDetails from "../../../hooks/usePetDetails";
import LoaderSpinner from "../../../components/LoaderSpinner/LoaderSpinner";
import { Helmet } from "react-helmet-async";

function AddPet() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const params = useParams();

  const { petDetails, isLoading: petLoading } = usePetDetails(params.id); // Fetch pet details if updating
  const [selectedOption, setSelectedOption] = useState(null); // Selected category

  const {
    register,
    handleSubmit,
    setValue, // To programmatically set values
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Set default values if updating an existing pet
    if (petDetails) {
      setValue("pet_name", petDetails.pet_name);
      setValue("pet_age", petDetails.pet_age);
      setValue("pet_location", petDetails.pet_location);
      setValue("pet_description", petDetails.pet_description);
      setSelectedOption({
        value: petDetails.pet_category,
        label: petDetails.pet_category,
      });
    }
  }, [petDetails, setValue]);

  const onSubmit = async (data) => {
    try {
      // Convert selected option to include in the form data
      data.pet_category = selectedOption ? selectedOption.value : null;

      const owner_info = {
        name: user?.displayName,
        email: user?.email,
      };
      const date = new Date();
      const formattedDate = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;

      // Create a new FormData instance
      const formData = new FormData();
      formData.append("pet_name", data.pet_name);
      formData.append("pet_age", data.pet_age);
      formData.append("pet_category", data.pet_category);
      formData.append("pet_location", data.pet_location);
      formData.append("pet_description", data.pet_description);
      formData.append("owner_info", JSON.stringify(owner_info));
      formData.append("posted_date", formattedDate); // Set posted date here

      // Append the image file if it's a new upload or if not updating
      if (data.pet_image && data.pet_image[0]) {
        formData.append("pet_image", data.pet_image[0]);
      }

      // Determine if adding a new pet or updating an existing pet
      let response;
      if (params.id) {
        // Update existing pet
        response = await axiosSecure.put(`/update-pet/${params.id}`, formData);
      } else {
        // Add new pet
        response = await axiosSecure.post("/add-pet", formData);
      }

      if (response.data?.insertedId || response.data?.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: params.id
            ? "Pet updated successfully"
            : "Pet added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/my-added-pets");
      }
    } catch (error) {
      console.error("Error uploading pet data:", error);
    }
  };

  const options = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "bird", label: "Bird" },
    { value: "fish", label: "Fish" },
    { value: "small pet", label: "Small Pet" },
  ];

  if (petLoading) {
    return <LoaderSpinner />; // Loading indicator while fetching pet details
  }

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <Helmet>
        <title>Paw Pals Rescue | Dashboard - Add Pet</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        {/* Pet Name Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Pet Name</span>
          </label>
          <input
            type="text"
            {...register("pet_name", { required: true })}
            placeholder="Pet name"
            className="input input-bordered"
          />
          {errors.pet_name && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        {/* Pet Age Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Age</span>
          </label>
          <input
            type="text"
            {...register("pet_age", { required: true })}
            placeholder="Pet age"
            className="input input-bordered"
          />
          {errors.pet_age && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        {/* Category Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <Select
            value={selectedOption}
            onChange={setSelectedOption}
            options={options}
            placeholder="Select pet category"
          />
          {!selectedOption && (
            <span className="text-red-600">Please select a category</span>
          )}
        </div>

        {/* Location Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            {...register("pet_location", { required: true })}
            placeholder="Pet location"
            className="input input-bordered"
          />
          {errors.pet_location && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        {/* Description Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            {...register("pet_description", { required: true })}
            placeholder="Pet description"
            className="textarea textarea-bordered"
          />
          {errors.pet_description && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        {/* Image Upload Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Pet Image</span>
          </label>
          <input
            type="file"
            {...register("pet_image", !params.id ? { required: true } : {})} // Make image optional for updates
            className="file-input w-full max-w-xs"
          />
          {errors.pet_image && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button className="btn btn-primary">
            {params.id ? "Update Pet" : "Add Pet"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPet;
