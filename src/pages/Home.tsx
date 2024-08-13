import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageSlider from "../components/Slider";
// import ProductSlider from "../components/ProductSlider";
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

  
  return (
    <div className="overflow-hidden">
                 
                 <div>
                 <ImageSlider images={images} width="800px" height="400px"/>
                 </div>
                 <div>
                 <ProductSlider sliderTitle="NEW EST" endpoint={newEst} visibleProducts={6} />
                 </div>
                 <div>
                 <ProductSlider sliderTitle="Top Selling" endpoint={topSelling} visibleProducts={6} />
                 </div>
                 <div>
                 <ProductSlider sliderTitle="Out Of Stock" endpoint={outOfStock} visibleProducts={6} />
                 </div>
    </div>
  );
};
