import { RootState } from "@/App/Store";
import ProductReview from "@/components/ProductReview";
import axiosInstance from "@/config/axios.config";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { FormEvent, useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const WriteAReview = ()=>{
    interface ProductCardProps {
        id: number;
        productId: number;
        productName: string;
        unitPrice: number;
        discount: number;
        rate: number;
        imageUrls: string[];
      }
    const storageKey = "loginData";
    const userDataString = localStorage.getItem(storageKey);
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const [hover,setHover] = useState(false)
    const [rateValue, setRateValue] = useState<number | null>(0);
    const [comment,setComment] = useState('');
    const navigate = useNavigate();
    const [ProductReviewData,setProductReviewData] = useState<ProductCardProps>({
        id: 0,
        productId: 0,
        productName: '',
        unitPrice: 0,
        discount: 0,
        rate: 0,
        imageUrls: [],
    })
    console.log(rateValue)
    const productId=useSelector((state: RootState) => state.productID.productId);

    useEffect(() =>{
        const fetchProduct = async () => {
            try {
                const response = await axiosInstance.get(`/api/Product/${productId}`);
                setProductReviewData(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct()
    },[productId])
    
    const onSubmit =async (e:FormEvent<HTMLFormElement>) => {
     e.preventDefault();

     if(!comment.length){
        toast.error("Put the comment text!.", {
            position: "top-right",
            duration: 5000,
            style: {
              backgroundColor: '#f8f48b',
              backdropFilter: 'blur(30px)',
              color: "yalow",
              width: "fit-content",
            },
          });
       return;
    }
    try {
       await axiosInstance.post('/api/Rating',{
           productId,
           rate:rateValue
       },{headers: {
           'Authorization': `Bearer ${userData?.token}`
       },})
   
         await axiosInstance.post('/api/Comments',{
               productId,
               content:comment 
        },{
           headers: {
               'Authorization': `Bearer ${userData?.token}`
           },
        })
        toast.success("add commend and rate successful.", {
           position: "top-right",
           duration: 5000,
           style: {
             backgroundColor: 'rgba(0, 0, 0, 0.05)',
             backdropFilter: 'blur(20px)',
             color: "green",
             width: "fit-content",
           },
         });
         setRateValue(0)
         setComment('')
         setTimeout(() => {
           navigate(-1)
         },2000)
    } catch (error) {
       toast.error("Something went wrong!.", {
           position: "top-right",
           duration: 5000,
           style: {
             backgroundColor: 'rgba(0, 0, 0, 0.05)',
             backdropFilter: 'blur(20px)',
             color: "red",
             width: "fit-content",
           },
         });
    }finally{
       setRateValue(0)
       setComment('')
    }
    }
    console.log(ProductReviewData.unitPrice);
    return(
        <div className="space-y-8 mt-20">
            <div className="flex justify-center text-3xl font-bold my-7">
              <h1>Rate Product</h1>
            </div>

            <div className="flex justify-center w-4/12 mx-auto">
              <ProductReview imgURL={ProductReviewData?.imageUrls[0]} productName={String(ProductReviewData?.productName)} productPrice={ProductReviewData?.unitPrice}/>
            </div>

            <form className="w-4/12 mx-auto space-y-5" onSubmit={onSubmit}>
                <div>
                    <h3 className="text-2xl font-bold">Add Your Review</h3>
                </div>
                <div>
                    <span className="text-gray-400">Rate Product from 1 to 5 where 5 is the best</span>
                </div>

                <div>
                <Stack spacing={1}>
                  <Rating onChange={(_, newValue) => {
                   setRateValue(newValue);
                  }} name="size-large" defaultValue={Number(rateValue)} size="large"/>
                </Stack>
                </div>
               <div>
                  <TextField onChange={(e) => {
                   setComment(e.target.value);
                  }} id="outlined-basic" label="Comment" variant="outlined" className="w-full"/>
               </div>

               <button
               onMouseEnter={()=> setHover(true)}
               onMouseLeave={()=> setHover(false)}
               style={{
                borderRadius:"15px"
               }} type="submit" className="px-4 py-2.5 border text-blue-600 hover:text-white hover:bg-blue-600 transition-all duration-300 font-bold tracking-wider flex">
                Submit Review
                {
                    hover ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 ml-1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg> : null
                }

                </button>
            </form>
        </div>
    )
}

export default WriteAReview;