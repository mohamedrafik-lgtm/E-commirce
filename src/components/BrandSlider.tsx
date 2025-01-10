import { useEffect, useState } from "react";
import BrandCart from "./BrandCart";
import axiosInstance from "@/config/axios.config";



interface IBrand {
    id:number;
    name:string;
    imageUrl:string
}
const BrandSlider  = () =>{
    const [showAllBrand, setShowAllBrand] = useState(false);
    const [Brand,setBrand] = useState<IBrand[]>([])
console.log(Brand)
   console.log(Brand)
    useEffect(()=>{

        const fetchBrand = async ()=>{
            try {
                const { data } = await axiosInstance.get('/api/brand')
                setBrand(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBrand()

 
    },[])

    // const brandLength = Brand.slice(0,8)


    const renderBrandSliderFirstItems = Brand.slice(0,6).map((brand)=> <div key={brand.id}><BrandCart brandId={brand.id} brandName={brand.name} imgUrl={brand.imageUrl}/></div>)
    const renderBrandSlider = Brand.map((brand)=> <div key={brand.id}><BrandCart brandId={brand.id} brandName={brand.name} imgUrl={brand.imageUrl}/></div>)
    return (
        <div className="w-full">
            <div style={{borderRadius:"10px"}} className="w-fit mx-auto p-3 border bg-gray-300/20 backdrop-blur-xl">
                <div className="space-y-4 px-10">
                   <h3 className="text-3xl">Buy By Brand</h3>
                   <hr />
                </div>
                 <div className="grid grid-cols-6 space-y-3 space-x-4 px-10 mt-5 items-center content-center">
                   { showAllBrand ? renderBrandSlider : renderBrandSliderFirstItems}
                 </div>
                    <div>
                       <div className="flex items-center space-x-4 py-3">
                          <button onClick={()=> setShowAllBrand(val => !val)} className="text-blue-500 hover:text-blue-600 mx-auto relative group overflow-hidden h-10">
                               {renderBrandSlider.length > 6 ? 
                                 <><span className="transition-transform duration-300 transform group-hover:-translate-y-10 mb-1">
                                    {showAllBrand ? "Show less brands" : "View All Brand"}
                                </span><span className="absolute inset-0 flex items-center justify-center transform translate-y-8 transition-transform duration-300 group-hover:translate-y-3">

                                        {showAllBrand ?
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                            </svg>}

                                    </span></> : null
                               }
                          </button>
                       </div>
                  </div>

            </div>
        </div>
    )
}

export default BrandSlider;