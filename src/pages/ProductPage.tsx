/* eslint-disable react-hooks/exhaustive-deps */
import{ memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../App/Store";
import ProductSlider from "../components/ProductSlider";
import { setProductId } from "@/App/features/productId";
import { useNavigate } from "react-router-dom";
import Comments from "@/components/Coments";
import axiosInstance from "@/config/axios.config";


interface ICommentsData {
    id: number,
    productId: number,
    userId: number,
    content: string
}
interface ProductData {
  productId: number;
  productName: string;
  unitPrice: number;
  description: string | null;
  brand: string;
  category: string;
  unitsInStock: number;
  discontinued: boolean;
  productCode: string;
  companyName: string;
  contactName: string;
  isArchived: boolean;
  tags: string[];
  productAttributes: string[];
  productAttributesValues: string[];
  imageUrls: string[];
}

const ProductPage = () => {
  const dispatch = useDispatch();
  const [isHover,setIsHover]= useState(false)
  const navigate = useNavigate()
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [commentsData,setCommentsData]=useState<ICommentsData[]>([])
  let productId=useSelector((state: RootState) => state.productID.productId); 
  const [selectedImage, setSelectedImage] = useState(productData?.imageUrls[0]);
  const storageKey = "loginData"
    const userDataString = localStorage.getItem(storageKey)
    const userData =userDataString ? JSON.parse(userDataString) : null;
  document.title = productData?.productName || "Product Page";
  useEffect(() => {
    if (!productId) {
        const storedProductId = localStorage.getItem('selectedProductId');
        if (storedProductId) {
            
            productId = +storedProductId; 
            dispatch(setProductId(productId)); 
        }
    }
    if (productId) {
        fetch(`http://localhost:5190/api/Product/${productId}`)
            .then(response => response.json())
            .then(data => {
                setProductData(data);
                console.log(data);
                setSelectedImage(data.imageUrls[0]);
            })
            .catch(error => console.error("Error fetching product data:", error));
    }
}, [productId, dispatch]);


   useEffect(() =>{
    
    const getComments =async ()=>{
     try {
      
      const {data}=  await axiosInstance.get(`/api/Comments/Product/${productId}`, {
        headers: {
          'Authorization': `Bearer ${userData?.token}`,
        }
      })
      setCommentsData(data)
     } catch (error) {
      console.log(error)
     }
     
    }
    getComments()
   },[])

  console.log(commentsData)
   const SimilarProducts: string = `/api/Home/${productId}/similar`
  return (
    <main className="w-full">
      <div className="container mx-auto p-8 mt-10 mb-10 bg-white rounded-lg max-w-7xl ">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Main Product Image */}
        <div className="md:w-1/2">
          <img
            style={{ borderRadius: "20px" }}
            src={selectedImage}
            alt={productData?.productName}
            className="w-full h-96 object-contain rounded-lg shadow-md mb-4"
          />
          <div className="flex gap-3 justify-center">
            {productData?.imageUrls.map((url, index) => (
              <img
                style={{ borderRadius: "5px" }}
                key={index}
                src={url}
                alt={`Thumbnail ${index + 1}`}
                className={`w-20 h-20 object-contain rounded-lg cursor-pointer border-2 ${
                  selectedImage === url ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(url)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
          <div className="justify-end text-right">
            <span className="inline-block bg-green-500 text-white text-sm px-3 py-1 rounded-full">
                  In Stock: {productData?.unitsInStock}
            </span>
            </div>
            
            <h1 className="text-4xl font-bold  text-wrap text-gray-800">
              {productData?.productName}
            </h1>
            
            
            <p className="text-3xl mt-4 font-semibold mb-6">
              ${productData?.unitPrice.toLocaleString()}
            </p>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Overview
              </h2>
              <p className="text-gray-600 mb-4">
                {productData?.description || "No description available."}
              </p>

              <div className="flex flex-wrap gap-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  Brand: {productData?.brand}
                </span>
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  Category: {productData?.category}
                </span>
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  Code: {productData?.productCode}
                </span>
                
              </div>

              <p
                className={`mt-4 text-lg font-semibold flex items-center ${
                  productData?.discontinued ? "text-red-500" : "text-green-500"
                }`}
              >
                {productData?.discontinued ? "Discontinued" : "Available"}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Attributes
              </h2>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {productData?.productAttributes.map((attr, index) => (
                  <li key={index}>
                    <span className="font-medium">{attr}:</span>{" "}
                    {productData?.productAttributesValues[index]}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Tags</h2>
              <div className="flex justify-between">
              <div className="flex flex-wrap gap-2">
                {productData?.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 text-sm content-center px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button className="rounded-md h-fit w-40 bg-blue-500 py-2 px-6 text-sm font-medium text-white focus:outline-none data-[hover]:bg-blue-600 data-[focus]:outline-1 data-[focus]:outline-white">
              Buy Now</button>
              </div>
            </div>
          </div>

          <div className="border-t mt-6 pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Company Information
            </h2>
            <p className="text-gray-700 mb-1">
              <span className="font-medium">Company Name:</span> {productData?.companyName}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Contact Name:</span> {productData?.contactName}
            </p>
          </div>
        </div>
      </div>
      </div>
        <ProductSlider sliderTitle="Similar Products" endpoint={SimilarProducts}  />

      <div className="flex justify-center mt-10">
        <button
        onClick={()=> navigate("/home/productPage/WriteAReview")}
        type="button"
        onMouseEnter={()=> setIsHover(true)}
        onMouseLeave={()=> setIsHover(false)}
        style={{ borderRadius: "30px"}}
        className="text-xl font-semibold text-blue-600 px-6 py-3 border border-blue-600 hover:text-white hover:bg-blue-600 transition-all duration-600 flex items-center">
          Write a Review
          
          {isHover ? 
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 ml-2 mt-1">
             <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
           </svg>  : null
        }
          

        </button>
      </div>


     {commentsData.length ? 
         <section className="container mx-auto p-8 mt-10 mb-10 bg-white rounded-lg max-w-7xl ">
         <div>
          <h1 className="text-3xl font-bold mb-6">Reviews</h1>
         </div>

         <div className="space-y-5">
           {commentsData.map((comment:ICommentsData)=>(
            <Comments comment={comment.content} rating={2}/>
           ))}
         </div>
       </section>
    : null 
    }
     




    </main>
  );
};


const MemoizedProductPage = memo(ProductPage);
export default MemoizedProductPage;
