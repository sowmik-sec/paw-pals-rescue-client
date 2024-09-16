function PetCategoryCard({ category }) {
  return (
    <div className=" rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-6 text-center">
        <h3 className="text-2xl font-semibold">{category.name}</h3>
        <p className=" mt-2">{category.description}</p>
        <a
          href={category.link}
          className="inline-block mt-4 px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition duration-300"
        >
          Browse {category.name}
        </a>
      </div>
    </div>
  );
}

export default PetCategoryCard;
