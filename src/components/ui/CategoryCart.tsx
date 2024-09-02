interface CategoryCardProps {
  name: string;
  description: string;
}

const CategoryCard = ({ name, description }: CategoryCardProps) => {
  return (
    <div 
      className="relative bg-gray-900 shadow-lg rounded-lg overflow-hidden cursor-pointer" 
      style={{
        borderRadius: "20px",
      }}
    >
      <div 
        className="w-full h- overflow-hidden" >
        <img 
          src={`${name === "Apple" ? '/IMG/iPhone-14-series.jpg' : null}`}
          alt={name} 
          className="w-full h-full object-cover" 
          style={{
            objectFit: "cover", 
          }}
        />
      </div>
      <div 
        className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-75 opacity-0 hover:opacity-100 transition-opacity duration-500 ease-in-out"
        style={{
          padding: "20px",
        }}
      >
        <h2 className="text-2xl font-semibold mb-2 text-white">{name} </h2>
        <p className="text-sm text-gray-300 text-center">
          {description.length > 50 ? `${description.slice(0, 50)}...` : description}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
