import { CardElement } from "@stripe/react-stripe-js";

function DonateModal() {
  return (
    <dialog id="donate-modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <form>
          <label className="label">
            <span className="label-text">Donation Amount</span>
          </label>
          <input
            type="text"
            placeholder="Enter donation amount"
            className="input input-bordered w-full mb-3"
          />
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
              className="btn btn-primary my-4 bg-yellow-400 hover:bg-yellow-700"
            >
              Donate
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default DonateModal;
