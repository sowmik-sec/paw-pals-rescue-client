import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { debounce } from "lodash"; // Import lodash's debounce

function DonateModal({ pet }) {
  const { max_donation, _id } = pet;
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [donationAmount, setDonationAmount] = useState(0);
  const [availableDonation, setAvailableDonation] = useState(max_donation); // Remaining donation amount

  // Fetch the total donations for the pet
  useEffect(() => {
    axiosSecure
      .get(`/donations/total/${_id}`) // Endpoint to get total donations for the pet
      .then((res) => {
        const totalDonations = res.data.totalDonations || 0;
        const remainingDonation = max_donation - totalDonations;
        setAvailableDonation(remainingDonation > 0 ? remainingDonation : 0); // Ensure non-negative value
      })
      .catch((err) => console.error("Error fetching total donations:", err));
  }, [axiosSecure, _id, max_donation]);

  // Debounce the API call to reduce unnecessary hits
  const handleDonationChange = debounce((value) => {
    if (value > 0 && value <= availableDonation) {
      axiosSecure
        .post("/create-donation-intent", {
          donation: value,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => console.error("Error creating donation intent:", err));
    }
  }, 500); // Debouncing delay set to 500ms

  // Update donation amount when user changes the input
  const handleInputChange = (e) => {
    const value = parseFloat(e.target.value);
    setDonationAmount(value);
    handleDonationChange(value); // Trigger debounced API call
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    // use your card element with other stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    // Confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        const payment = {
          email: user?.email,
          donation: donationAmount,
          transactionId: paymentIntent.id,
          date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()}`, // Corrected month
          pet_id: _id,
          status: "succeeded", // Update the status
        };
        const res = await axiosSecure.post("/donations", payment);
        console.log(res);
        if (res.data?.donationResult?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thank you for the donation",
            showConfirmButton: false,
            timer: 1500,
          });
          document.getElementById("donate-modal").close();
          navigate("/dashboard/my-donations");
        }
      }
    }
  };

  return (
    <dialog id="donate-modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <form onSubmit={handleSubmit}>
          <h3 className="text-2xl">
            Max donation amount: {max_donation}, Available: {availableDonation}
          </h3>
          <label className="label">
            <span className="label-text">Donation Amount</span>
          </label>
          <input
            type="number"
            onChange={handleInputChange} // Use the debounced input handler
            placeholder="Enter donation amount"
            className="input input-bordered w-full mb-3"
            min="1"
            max={availableDonation}
          />
          {donationAmount > availableDonation && (
            <h3 className="text-red-600">
              Donation must be less than or equal to {availableDonation}
            </h3>
          )}
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={
                !stripe ||
                !clientSecret ||
                donationAmount <= 0 ||
                donationAmount > availableDonation
              }
              className="btn btn-primary my-4 bg-yellow-400 hover:bg-yellow-700"
            >
              Donate
            </button>
          </div>
          {error && <p className="text-red-600">{error}</p>}
          {transactionId && <p>Your transaction id: {transactionId}</p>}
        </form>
      </div>
    </dialog>
  );
}

export default DonateModal;
