import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageSlider from "../components/Slider";
import ProductSlider from "../components/ProductSlider";


export const Home = () => {

  
  
  const images = [
    '/IMG/iphone-14-lg-fornece-tela-oled_2.jpg',
    '/IMG/iphone-14-lg-fornece-tela-oled_2.jpg',
    '/IMG/iphone-14-lg-fornece-tela-oled_2.jpg',
  ];
  // end points
   const newEst:string = "/api/Home/newest"
   const topSelling:string = '/api/Home/top-selling'
   const outOfStock:string = '/api/Home/out-of-stock'


   
  // const [cartItems, setCartItems] = useState<Products[]>([]);
  // console.log(cartItems)
  // const removeFromCart = (productId: number) => {
  //   setCartItems((prevCartItems) =>
  //     prevCartItems.filter((item) => item.id !== productId)
  //   );
  // };
  
  
  return (
    <div>
                 <div>
                 <ImageSlider images={images} width="1000px" height="400px"/>
                 </div>
       
             <div className="">
                <div>
                <ProductSlider endpoint={newEst} sliderTitle="NEW EST"/>
                </div>
                <div>
                <ProductSlider endpoint={topSelling} sliderTitle="top selling"/>
                </div>
                <div>
                <ProductSlider endpoint={outOfStock} sliderTitle="Out Of Stock"/>
                </div>
             </div>
    </div>
  );
};
