import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

function CreateDonationCampaign() {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const { user } = useAuth();
  const creator_info = {
    email: user?.email,
    name: user?.displayName,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dateFormat = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("pet_name", data.pet_name);
      formData.append("max_donation", data.max_donation);
      formData.append("last_date", data.last_date);
      formData.append("short_description", data.short_description);
      formData.append("long_description", data.long_description);
      formData.append("donation_created_at", dateFormat);
      formData.append("creator_info", JSON.stringify(creator_info));
      // Append image if selected
      if (imageFile) {
        formData.append("pet_image", imageFile);
      }

      // Send the form data to the backend API
      const response = await axiosSecure.post(
        "/create-donation-campaign",
        formData
      );

      if (response.data?.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Donation campaign created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/my-donation-campaigns");
      }
    } catch (error) {
      console.error("Error creating campaign:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <Helmet>
        <title>Paw Pals Rescue | Dashboard - Create Donation Campaign</title>
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

        {/* Maximum Donation Amount */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Max Donation Amount</span>
          </label>
          <input
            type="number"
            {...register("max_donation", { required: true })}
            placeholder="Max donation amount"
            className="input input-bordered"
          />
          {errors.max_donation && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        {/* Last Date of Donation */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Last Date of Donation</span>
          </label>
          <input
            type="date"
            {...register("last_date", { required: true })}
            className="input input-bordered"
          />
          {errors.last_date && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        {/* Short Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Short Description</span>
          </label>
          <textarea
            {...register("short_description", { required: true })}
            placeholder="Short description"
            className="textarea textarea-bordered"
          />
          {errors.short_description && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        {/* Long Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Long Description</span>
          </label>
          <textarea
            {...register("long_description", { required: true })}
            placeholder="Long description"
            className="textarea textarea-bordered"
          />
          {errors.long_description && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        {/* Pet Image Upload */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Pet Image</span>
          </label>
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="file-input w-full max-w-xs"
          />
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button className="btn btn-primary">Create Campaign</button>
        </div>
      </form>
    </div>
  );
}

export default CreateDonationCampaign;
