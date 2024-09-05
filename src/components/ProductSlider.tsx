import  { useEffect, useState } from "react";
import { Products } from "../interface";
import axiosInstance from "../config/axios.config";
import ProductCard from "./ui/ProductCard";
import Variants from "./ui/Scilaton";



interface IProps{
  visibleProducts:number,
  endpoint:string,
  sliderTitle: string;
}
const ProductSlider  = ( {visibleProducts,endpoint,sliderTitle}:IProps) => {
  const [loading, setLoading] = useState(true);
  
    const [products, setProduct] = useState<Products[]>([]);
    
    useEffect(() => {
      setLoading(true)
        const fetchProducts = async () => {
          try {
            const {data} = await axiosInstance.get(endpoint);
            setProduct(data);
            setLoading(false)
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
        
        fetchProducts().finally(() => setLoading(false));
      }, [endpoint]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? products.length - visibleProducts : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex >= products.length - visibleProducts;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  if(loading) return <Variants/>
  if(!products.length) return;
  return (
    <div className="relative  w-full mr-3">
        <div className="mb-5">
        <h3 className= "text-2xl p-2 text-center">{sliderTitle}</h3>
        <hr className="w-3/4 mx-auto"/>
        </div>
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 transform -translate-y-1/2 left-4 w-7 h-7 bg-gray-800 text-white  rounded-full hover:bg-gray-700 transition duration-300 z-10"
      >
        ❮
      </button>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleProducts)}%)`,
          }}
        >


          {products.map((product, index) => (
            <div
              key={index}
              className="flex-shrink-0 duration-300 hover:scale-105 p-4"
              style={{ width: `${100 / visibleProducts}%` }}
            >
              <ProductCard key={product.productId} id={product.id} discount={product.discount} imageUrl={product.imageUrl} rate={product.rate} unitPrice={product.unitPrice}
               isLoading={loading} productId={product.productId} productName={product.productName}/>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={goToNext}
        className="absolute top-1/2 transform -translate-y-1/2 right-0 w-7 h-7 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition duration-300 z-10"
      >
        ❯
      </button>
    </div>
  );
};

export default ProductSlider;
