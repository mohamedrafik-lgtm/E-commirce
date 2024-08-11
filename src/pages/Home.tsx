import React, {  useEffect, useState } from "react";
import Slider from "react-slick";
import ProductCard from "../components/ui/ProductCard";
import axiosInstance from "../config/axios.config";
import Cart from "../components/ui/Cart";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageSlider from "../components/Slider";

interface Products {
  id:  number;
  productId: number;
  productName: string;
  unitPrice: number;
  discount: number;
  rate: number;
  imageUrl: string | null;
}

export const Home: React.FC = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };
  const [product, setProduct] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(setLoading)
  console.log(product)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/api/Home/newest');
        const data = await response.data;
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const images = [
    '/IMG/iphone-14-lg-fornece-tela-oled_2.jpg',
    '/IMG/iphone-14-lg-fornece-tela-oled_2.jpg',
    '/IMG/iphone-14-lg-fornece-tela-oled_2.jpg',
  ];
 

  const [cartItems, setCartItems] = useState<Products[]>([]);
  console.log(cartItems)
  const removeFromCart = (productId: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== productId)
    );
  };
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  return (
    <div>
       
            <div className="min-h-screen bg-gray-100 p-8">
             <ImageSlider images={images} width="1000px" height="400px"/>
      <Slider {...settings}>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> */}
        {product.map((product) => (
          <div key={product.id}>

            <ProductCard discount={product.discount} imageUrl={`${product.imageUrl}`} productId={product.id} productName={`${product.productName}`} key={product.id} rate={product.rate}  unitPrice={product.unitPrice}/>
          </div>
        ))}
      {/* </div> */}
      </Slider>
        
        <Cart cartItems={cartItems} onRemoveFromCart={removeFromCart} />
      
    </div>
    </div>
  );
};
