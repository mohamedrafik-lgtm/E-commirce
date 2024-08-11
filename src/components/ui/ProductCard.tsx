// src/components/ProductCard.tsx
// src/components/ProductCard.tsx
// import { Product } from '../../interface';
interface ProductCardProps {
  productId: number;
  productName: string;
  unitPrice: number;
  discount: number;
  rate: number;
  imageUrl: string | undefined;
  
}


const ProductCard: React.FC<ProductCardProps> = ({
  productName,
  unitPrice,
  discount,
  rate,
  imageUrl
}) => {
  return (
    <div className="bg-white border rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        {imageUrl ? (
          <img src={imageUrl} alt={productName} className="w-full h-48 object-cover" />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-600">No Image</span>
          </div>
        )}
        <h3 className="text-xl font-semibold mt-2">{productName}</h3>
        <p className="text-lg text-gray-700">${unitPrice.toFixed(2)}</p>
        {discount > 0 && (
          <p className="text-red-500">Discount: {discount}%</p>
        )}
        <p className="text-yellow-500">Rating: {rate}/5</p>
      </div>
    </div>
  );
};

export default ProductCard;