function PetCard({ pet }) {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img src={pet.pet_image} className="w-full h-64" alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {pet.pet_name}
          <div className="badge badge-secondary">{pet.pet_category}</div>
        </h2>
        <p>{pet.pet_description}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{pet.pet_age}</div>
          <div className="badge badge-outline">{pet.pet_location}</div>
          <div className="badge badge-outline">{pet.posted_date}</div>
        </div>
        <button className="btn btn-outline bg-orange-500 text-white w-1/2 mx-auto mt-5 border-t-0 border-x-0">
          Request Adoption
        </button>
      </div>
    </div>
  );
}

export default PetCard;
