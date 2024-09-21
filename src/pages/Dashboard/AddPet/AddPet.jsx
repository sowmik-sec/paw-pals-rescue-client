import { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AddPet() {
  const [selectedOption, setSelectedOption] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      // Convert selected option to include in the form data
      data.pet_category = selectedOption ? selectedOption.value : null;

      const owner_info = {
        name: user?.displayName,
        email: user?.email,
      };

      // Create a new FormData instance
      const formData = new FormData();
      formData.append("pet_name", data.pet_name);
      formData.append("pet_age", data.pet_age);
      formData.append("pet_category", data.pet_category);
      formData.append("pet_location", data.pet_location);
      formData.append("pet_description", data.pet_description);
      formData.append("owner_info", JSON.stringify(owner_info));
      formData.append("posted_date", new Date().toISOString()); // You can set posted_date here if needed

      // Append the image file to FormData
      formData.append("pet_image", data.pet_image[0]);

      // Send the form data to the backend using Axios
      const response = await axiosSecure.post("/add-pet", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data?.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Pet added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/my-added-pets");
      }
      console.log("Response from server:", response.data);
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

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
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
            defaultValue={selectedOption}
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
            {...register("pet_image", { required: true })}
            className="file-input w-full max-w-xs"
          />
          {errors.pet_image && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button className="btn btn-primary">Add Pet</button>
        </div>
      </form>
    </div>
  );
}

export default AddPet;
