
interface IProp{
  imgURL: string;
  productName: string;
  productPrice: number;
}
const ProductReview = ({imgURL,productName,productPrice}:IProp) => {
  console.log(imgURL)
    return (
        <div className="w-full">
          <div style={{borderRadius:"15px"}} className="flex border product-rate items-center pr-8 w-full">
            <div>
                <img className="w-25 h-20 object-contain" src={imgURL} alt={productName} />
            </div>

            <div className="space-y-2 ">
                
              <div className="max-w-96 text-wrap font-serif">
                  <span >
                    {productName.length > 70 ? `${productName.slice(0, 70)}...` : productName}
                  </span>
              </div>

              <div>
                <span className="text-blue-600 font-bold text-xl">{productPrice} EGP</span>
              </div>

            </div>
            
          </div>
         </div>
    )
}

export default ProductReview