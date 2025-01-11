import axiosInstance from "@/config/axios.config";
import CategoryCartItem from "@/Dashboard/CategoryCartItem";
import { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';
import AddCategoryModel from "./AddCategoryModel";



interface IProps{
    id:number,
    name:string,
    description: string,
    imageUrl:string,
}
const Category = ()=>{
    document.title = 'Category';
    const [category,setCategory] = useState<IProps[]>([])
    useEffect(()=>{
        const categoryRequst =async ()=>{
            try {
                const { data } = await axiosInstance.get('/api/Category')
                setCategory(data)
            } catch (error) {
                console.log(error)
            }
        }
        categoryRequst()
    },[])
    console.log(category)
    const renderCategoryItems = category.map((data) =><div key={uuid()}>
        <CategoryCartItem name={data.name} imageUrl={data.imageUrl} id={data.id} description={data.description}/>
    </div>)
    
    return (
        <div className="flex flex-col w-full h-fit justify-around">
             <div className="grid grid-cols-5 gap-4 px-3">
             {renderCategoryItems}
             <div className="flex items-center">
               <AddCategoryModel/>
             </div>
             </div>
        </div>
    )
}

export default Category;