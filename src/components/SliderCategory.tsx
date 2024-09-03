import  { useEffect, useState } from "react";
import axiosInstance from "../config/axios.config";
import CategoryCard from "./ui/CategoryCart";



interface IProps{
  visibleProducts:number,
  endpoint:string,
  sliderTitle: string;
}
const SliderCategory  = ( {visibleProducts,endpoint,sliderTitle}:IProps) => {
  const [loading, setLoading] = useState(true);
    const [products, setProduct] = useState<{name:string,description:string}[]>([]);
    console.log(loading)
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
        
        fetchProducts();
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
  if(!products.length) return;
  return (
    <div style={{
        borderRadius: '15px'
    }} className="relative w-full mr-3 p-4">
        <h3 className= "text-2xl p-2 ml-6 mb-4 sliderTitle">{sliderTitle} :</h3>
         
      <button
        onClick={goToPrevious}
        className="absolute top-52 transform -translate-y-1/2 -left-5 w-7 h-7 bg-gray-800 text-white  rounded-full hover:bg-gray-700 transition duration-300 z-10"
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


          {products.map((Category, index) => (
            <div
              key={index}
              className="flex-shrink-0 duration-300 h-fit hover:scale-105 p-4"
              style={{ width: `${100 / visibleProducts}%` ,
                
              }}
            >
              <div className="flex w-fit bg-gray-100">
                <CategoryCard name={Category.name} description={"The apple is one of the pome (fleshy) fruits. Apples at harvest vary widely in size"} />
                 </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={goToNext}
        className="absolute top-52 transform -translate-y-1/2 -right-5 w-7 h-7 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition duration-300 z-10"
      >
        ❯
      </button>
    </div>
  );
};

export default SliderCategory;
