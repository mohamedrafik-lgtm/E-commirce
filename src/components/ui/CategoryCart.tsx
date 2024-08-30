import React from 'react';

interface CategoryCardProps {
  name: string;
  description: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, description }) => {
  return (
    <div style={{
        borderRadius:"15px"
    }} className="bg-black shadow-md text-white p-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <p className="">{description.length > 20 ? `${description.slice(0,50)}...`:description}</p>
    </div>
  );
};

export default CategoryCard;
