import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageSlider from "../components/Slider";
import ProductSlider from "../components/ProductSlider";
import SliderCategory from "@/components/SliderCategory";
// import { useSelector } from "react-redux";
// import { RootState } from "../App/Store";
// import FilterProduct from "../components/FilterProduct";


export const Home = () => {

  
  // const filterdValue = useSelector((state:RootState) => state.filterSlice)
  // const searchValue = useSelector((state:RootState) => state.Search)
  
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
  //  if(searchValue.length){
  //   return <FilterProduct/>
  //  }
  return (
    <div className="overflow-hidden">
                 
                 <div className="mb-20">
                      <ImageSlider images={images} width="1200px" height="320px"/>
                 </div>
                 <div>
                      <ProductSlider sliderTitle="NEW EST" endpoint={newEst} visibleProducts={6} />
                 </div>
                 <div>
                      <ProductSlider sliderTitle="Top Selling" endpoint={topSelling} visibleProducts={6} />
                 </div>
                 <div>
                      <ProductSlider sliderTitle="on sale" endpoint={onSale} visibleProducts={6} />
                 </div>
                 <div className="mb-14">
                      <ProductSlider sliderTitle="Out Of Stock" endpoint={outOfStock} visibleProducts={6} />
                 </div>

                 <hr className="w-10/12 mx-auto"/>

                 <div className="w-4/6 mt-10 mx-auto">
                      <SliderCategory visibleProducts={5} endpoint={getAll} sliderTitle={"Category"}/>
                 </div>
    </div>
  );
};
