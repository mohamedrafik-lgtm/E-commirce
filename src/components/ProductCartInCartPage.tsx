

interface IProp{
    imgUrl: string;
    productName:string;
    productPrice:number
}

const ProductCartInCartPage = ({imgUrl,productPrice,productName}:IProp)=>{


    return(
        <div className="flex justify-between">
            <div className="space-x-5 flex items-center">
              <img src={imgUrl} alt={productName}  style={{borderRadius:'5px'}} className="object-cover w-16 h-16"/>
              <h3 className="text-lg">{productName}</h3>
            </div>
            <div className="flex items-center">
              <p>${productPrice}</p>
            </div>
        </div>
    )
 
}

export default ProductCartInCartPage;