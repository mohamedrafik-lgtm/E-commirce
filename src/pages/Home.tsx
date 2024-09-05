import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageSlider from "../components/Slider";
import ProductSlider from "../components/ProductSlider";
import SliderCategory from "@/components/SliderCategory";
import ScrollAnimatedComponent from "@/components/ScrollAnimatedComponent";



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
   const onSale:string = "/api/Home/on-sale"
   const getAll:string  = "/GetAll"
    
  return (
    <div className="overflow-hidden space-y-5">
                 
                 <div className="mb-20">
                 <ScrollAnimatedComponent direction="top">
                      <ImageSlider images={images} width="1200px" height="320px"/>
                 </ScrollAnimatedComponent>
                 </div>
                 <div className="mr-3 ml-14">
                   <ScrollAnimatedComponent direction="right">
                      <ProductSlider sliderTitle="NEW EST" endpoint={newEst} visibleProducts={6} />
                   </ScrollAnimatedComponent>
                 </div>
                 <div className="mr-3">
                   <ScrollAnimatedComponent direction="left">
                      <ProductSlider sliderTitle="Top Selling" endpoint={topSelling} visibleProducts={6} />
                   </ScrollAnimatedComponent>
                 </div>
                 <div className="mr-3">
                 <ScrollAnimatedComponent direction="right">
                      <ProductSlider sliderTitle="on sale" endpoint={onSale} visibleProducts={6} />
                 </ScrollAnimatedComponent>
                 </div >
                 <hr className="w-10/12 mx-auto"/>

                 <div className="w-10/12  mt-10 mx-auto ">
                 <ScrollAnimatedComponent direction="right">
                      <SliderCategory visibleProducts={5} endpoint={getAll} sliderTitle={"Category"}/>
                 </ScrollAnimatedComponent>
                 </div>
                 <div className="mb-14 mr-3">
                 <ScrollAnimatedComponent direction="left">
                      <ProductSlider sliderTitle="Out Of Stock" endpoint={outOfStock} visibleProducts={6} />
                 </ScrollAnimatedComponent>
                 </div>

                 
                 
    </div>
  );
};
