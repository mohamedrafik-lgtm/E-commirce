import { useEffect, useState } from "react";
import axiosInstance from "../config/axios.config";
import { Products } from "../interface";
import Slider from "react-slick";
import ProductCard from "../components/ui/ProductCard";



interface Iprops{
    endpoint: string;
    sliderTitle: string;
}
const ProductSlider = ({endpoint,sliderTitle}:Iprops) => {
    const [loading, setLoading] = useState(true);
  console.log(setLoading)
    const [product, setProduct] = useState<Products[]>([]);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
      };
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axiosInstance.get(endpoint);
            const data = await response.data;
            setProduct(data);
            setLoading(false)
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchProducts();
      }, [endpoint]);
    return <div className=" pl-8 pr-8 pb-4 space-y-3">
        <div className="flex flex-col p-3 items-center">
        <h3 className=" text-2xl p-2 text-center border-b-2">{sliderTitle}</h3>
        <hr className=" w-3/5"/>
        </div>
        {product ? <Slider {...settings}>
      {product.map((product) => (
             <ProductCard isLoading={loading} discount={product.discount} imageUrl={`${product.imageUrl}`} productId={product.id} productName={`${product.productName}`} key={product.id} rate={product.rate}  unitPrice={product.unitPrice}/>
          ))}
    </Slider>:null}
  </div>
}


export default ProductSlider;