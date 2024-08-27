import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageSlider from "../components/Slider";
// import ProductSlider from "../components/ProductSlider";
import ProductSlider from "../components/ProductSlider";
import { useSelector } from "react-redux";
import { RootState } from "../App/Store";
import axiosInstance from "../config/axios.config";


export const Home = () => {

  
  const filterdValue = useSelector((state:RootState) => state.filterSlice)
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
   
   const filter = async () => {
    try {
      const response = await axiosInstance.get("/api/Home/filter", {
        params: {
          Name: filterdValue.Name,
          Category: filterdValue.Category,
          Brand: filterdValue.Brand,
          MinPrice: filterdValue.MinPrice,
          MaxPrice: filterdValue.MaxPrice,
          MinDiscount: filterdValue.MinDiscount,
          MaxDiscount: filterdValue.MaxDiscount,
          MinRate: filterdValue.MinRate,
          MaxRate: filterdValue.MaxRate,
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null; 
    }
  };
  
 
  const fetchData = async () => {
    const result = await filter();
    console.log(result);
  };
  
  fetchData();
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
                 <div>
                 <ProductSlider sliderTitle="Out Of Stock" endpoint={outOfStock} visibleProducts={6} />
                 </div>
    </div>
  );
};
