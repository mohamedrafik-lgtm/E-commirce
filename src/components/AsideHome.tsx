import { ChangeEvent, FormEvent, useState } from "react";
import InputComponent from "./ui/InputComponent";
import axiosInstance from "../config/axios.config";


interface IResearch{
    Name: string;
  Category: string;
  Brand: string;
  MinPrice: number | null;
  MaxPrice: number | null;
  MinDiscount: number | null;
  MaxDiscount: number | null;
  MinRate: number | null;
  MaxRate: number | null;
}
const Sidebar: React.FC = () => {


  const [research,setResearch] = useState<IResearch>({
    Name: '',
    Category: '',
    Brand: '',
    MinPrice: null,
    MaxPrice: null,
    MinDiscount: null,
    MaxDiscount: null,
    MinRate: null,
    MaxRate: null,
  })

const handelChange = (event: ChangeEvent<HTMLInputElement>)=>{
  const { value, name } = event.target;
  setResearch({
    ...research,
  [name]: value
  })
}

  const handelSubmit = (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    try {
       const response = axiosInstance.get("/api/Home/filter",{
        params: {
         ...research
        }
       })
       console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
 
  
  return (
    <div
    className={`border  from-gray-800 to-gray-600 p-2  transition-all duration-300 w-64 z-50`}
    style={{ height: '100vh' }}
  >
    <div className="flex items-center justify-between p-4">
      <h2 className={`text-xl font-bold`}>research</h2>
    </div>
    <form onSubmit={handelSubmit} className={`flex flex-col space-y-3 mt-6`}>
      <div>
        <label htmlFor="Name" className="text-lx">NAME</label>
        <InputComponent onChange={handelChange} name="Name" id="Name" className="border mb-1 w-full rounded-md p-1"/>
      </div>
      <div>
        <label htmlFor="Category" className="text-lx">Category</label>
        <InputComponent onChange={handelChange} name="Category" id="Category" className="border mb-1 w-full rounded-md p-1"/>
      </div>
      <div>
        <label htmlFor="Brand" className="text-lx">Brand</label>
        <InputComponent onChange={handelChange} name="Brand" id="Brand" className="border mb-1 w-full rounded-md p-1"/>
      </div>
      <div>
        <label htmlFor="MinPrice" className="text-lx">MinPrice</label>
        <InputComponent onChange={handelChange} name="MinPrice" id="MinPrice" className="border mb-1 w-full rounded-md p-1"/>
      </div>
      <div>
        <label htmlFor="MaxPrice" className="text-lx">MaxPrice</label>
        <InputComponent onChange={handelChange} name="MaxPrice" id="MaxPrice" className="border mb-1 w-full rounded-md p-1"/>
      </div>
      <div>
        <label htmlFor="MinDiscount" className="text-lx">MinDiscount</label>
        <InputComponent onChange={handelChange} name="MinDiscount" id="MinDiscount" className="border mb-1 w-full rounded-md p-1"/>
      </div>
      <div>
        <label htmlFor="MaxDiscount" className="text-lx">MaxDiscount</label>
        <InputComponent onChange={handelChange} name="MaxDiscount" id="MaxDiscount" className="border mb-1 w-full rounded-md p-1"/>
      </div>
      <div>
        <label htmlFor="MinRating" className="text-lx">MinRating</label>
        <InputComponent onChange={handelChange} name="MinRating" id="MinRating" className="border mb-1 w-full rounded-md p-1"/>
      </div>
      <div>
        <label htmlFor="MaxRating" className="text-lx">MaxRating</label>
        <InputComponent onChange={handelChange} name="MaxRating" id="MaxRating" className="border mb-1 w-full rounded-md p-1"/>
      </div>
      
    <button className="p-1 mt-10 w-full text-xl rounded-md bg-blue-600 text-white">research</button>
    </form>
  </div>
  );
};

export default Sidebar;

