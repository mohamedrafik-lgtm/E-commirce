import { IProp } from "../../interface"
import BasicRating from "./BasicRating"

const ProducrCard = ({description,imgSrc,price}:IProp) => {

    return (
        <div className="flex p-5">
            <div className="p-3 rounded-md hover:border-2 hover:border-black hover:shadow-lg hover:shadow-black-500 hover:md:shadow-xl transition duration-300 hover:scale-105">
               <div className="flex items-center justify-center pb-2 ">
                   <img width={130} src={imgSrc}/>
                </div>
                <div>
                    <p className="text-lg">{description}</p>
                </div>
                    <span className="text-red-900 text-lg">{price}</span>
               <div>
                <BasicRating/>
               </div>
               </div>
        </div>
    )
}

export default ProducrCard