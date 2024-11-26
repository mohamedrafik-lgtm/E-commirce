import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductSlider from "../components/ProductSlider";
import SliderCategory from "@/components/SliderCategory";
import ScrollAnimatedComponent from "@/components/ScrollAnimatedComponent";
import { lazy, Suspense } from "react";
import BrandSlider from "@/components/BrandSlider";
const LazyLoadingAdvertisingBanner = lazy(() => import("@/components/ui/AdvertisingBanner"))
const LazyLoadingImageSlider = lazy(() => import("../components/Slider"))

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
   const getAll:string  = "/api/Category"
    

    
  return (
    <div className="overflow-hidden space-y-8">
                 
                 <div className="mb-20">
                      <Suspense fallback={<h3>Loding...</h3>}>
                        <ScrollAnimatedComponent direction="top">
                          <LazyLoadingImageSlider images={images} width="1200px" height="320px"/>
                        </ScrollAnimatedComponent>
                      </Suspense>
                 </div>
                 <div className="mr-3 ml-14">
                   <Suspense fallback={<h3>Loding...</h3>}>
                     <ScrollAnimatedComponent direction="right">
                       <ProductSlider sliderTitle="NEW EST" endpoint={newEst} visibleProducts={6} />
                     </ScrollAnimatedComponent>
                   </Suspense>
                 </div>
                 <div>
                 <Suspense fallback={<h3>Loding...</h3>}>
                   <ScrollAnimatedComponent direction="left">
                      <LazyLoadingAdvertisingBanner/>
                   </ScrollAnimatedComponent>
                  </Suspense>
                 </div>
                 <div className="mr-3">
                 <Suspense fallback={<h3>Loding...</h3>}>
                   <ScrollAnimatedComponent direction="left">
                      <ProductSlider sliderTitle="Top Selling" endpoint={topSelling} visibleProducts={6} />
                   </ScrollAnimatedComponent>
                 </Suspense>
                 </div>
                 {/* BrandSlider */}

                 <div className="mr-3">
                 <Suspense fallback={<h3>Loding...</h3>}>
                   <ScrollAnimatedComponent direction="left">
                      <BrandSlider/>
                   </ScrollAnimatedComponent>
                 </Suspense>
                 </div>
                 
                 <div className="mr-3">
                 <Suspense fallback={<h3>Loding...</h3>}>
                   <ScrollAnimatedComponent direction="right">
                      <ProductSlider sliderTitle="on sale" endpoint={onSale} visibleProducts={6} />
                   </ScrollAnimatedComponent>
                 </Suspense>
                 </div >
                 <hr className="w-10/12 mx-auto"/>

                 <div className="w-10/12  mt-10 mx-auto ">
                 <Suspense fallback={<h3>Loding...</h3>}>
                   <ScrollAnimatedComponent direction="right">
                      <SliderCategory visibleProducts={5} endpoint={getAll} sliderTitle={"Category"}/>
                   </ScrollAnimatedComponent>
                 </Suspense>
                 </div>
                 <div className="mb-14 mr-3">
                 <Suspense fallback={<h3>Loding...</h3>}>
                   <ScrollAnimatedComponent direction="left">
                      <ProductSlider sliderTitle="Out Of Stock" endpoint={outOfStock} visibleProducts={6} />
                   </ScrollAnimatedComponent>
                 </Suspense>
                 </div>

                 
                 
    </div>
  );
};
