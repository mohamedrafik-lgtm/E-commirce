// import { useEffect, useState } from "react";
// import axiosInstance from "../config/axios.config";
// import { Products } from "../interface";
// import Slider from "react-slick";
// import ProductCard from "../components/ui/ProductCard";



// interface Iprops{
//     endpoint: string;
//     sliderTitle: string;
// }
// const ProductSlider = ({endpoint,sliderTitle}:Iprops) => {
//     const [loading, setLoading] = useState(true);
//     const [product, setProduct] = useState<Products[]>([]);
//     console.log(product.map(product => console.log(product.productId)))
//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: sliderTitle === "NEW EST" ? 5 : 6,
//         slidesToScroll: 1,
//       };
//     useEffect(() => {
//         const fetchProducts = async () => {
//           try {
//             const {data} = await axiosInstance.get(endpoint);
//             setProduct(data);
//             setLoading(false)
//           } catch (error) {
//             console.error('Error fetching products:', error);
//           }
//         };
    
//         fetchProducts();
//       }, [endpoint]);
//     return <div className={`${sliderTitle === "NEW EST" ? "w-10/12 ml-64 ":null} pl-8 pr-8 pb-4 space-y-3 `}>
//         <div className="flex flex-col items-center p-3">
//         <h3 className= {`text-2xl ${sliderTitle === "NEW EST" ? "w-1/3 ":null} p-2 text-center border-b-2`}>{sliderTitle}</h3>
//         <hr className=" w-3/5"/>
//         </div>
//         {product ? <Slider  {...settings}>
//       {product.map((product) => (
        
//           <ProductCard id={product.productId} key={product.id} isLoading={loading} discount={product.discount} imageUrl={`${product.imageUrl}`} productId={product.id} productName={`${product.productName}`}  rate={product.rate}  unitPrice={product.unitPrice}/>
       
//           ))}
//     </Slider>:null}
//   </div>
// }


// export default ProductSlider;






// src/Slider.tsx
import  { useEffect, useState } from "react";
import { Products } from "../interface";
import axiosInstance from "../config/axios.config";
import ProductCard from "./ui/ProductCard";



interface IProps{
  visibleProducts:number,
  endpoint:string,
  sliderTitle: string;
}
const ProductSlider  = ( {visibleProducts,endpoint,sliderTitle}:IProps) => {
  const [loading, setLoading] = useState(true);
  console.log(loading)
    const [products, setProduct] = useState<Products[]>([]);
    console.log(products)
    useEffect(() => {
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

  return (
    <div className="relative w-full/12">
        <h3 className= "text-2xl p-2 text-center">{sliderTitle}</h3>
         <hr className="w-3/4 mx-auto"/>
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
              className="flex-shrink-0 p-4"
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
