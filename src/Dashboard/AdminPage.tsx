import { ChangeEvent, FormEvent, useState,Fragment } from "react";
import InputComponent from "../components/ui/InputComponent";
import { IPrice, IProductInformations } from "../interface";
import { Switch } from '@headlessui/react';
import clsx from 'clsx';
import axiosInstance from "../config/axios.config";
import { SelectChangeEvent } from "@mui/material";
import { IOrganization } from "../interface";

const AddProduct = () => {
    
  const options = [
    { value: 'nvidia', label: 'nvidia' },
    { value: 'AMD', label: 'AMD' },
    { value: 'intel', label: 'intel' },
  ];


   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
   const [previews, setPreviews] = useState<string[]>([]);
   const [filePaths, setFilePaths] = useState<string[]>([]);
   const [ProductInformation,setProductInformation] = useState<IProductInformations>({
      productName:'',
      Discription:'',
      SKU: '',
      unitInStock:0
   })
   const [enabled, setEnabled] = useState<boolean>(false)
   const [price, setPrice] = useState<IPrice>({
    priceValue:0,
    discount:0,
    endDate: '',
})
const [organization,setOrganization] = useState<IOrganization>({
  Vendor:'',
  contactName: '',
  combanyName:'',
  brand: '',
  Tags:'',
})


const bytesToKb = (bytes: number): number => {
  return Math.round(bytes / 1024); // تحويل البايت إلى Kbyte وتقريبه
};
// handlers
const handlerPriceChange = (event:ChangeEvent<HTMLInputElement>) => {
   const {value,name} = event.target
   setPrice({
    ...price,
     [name]: value
   })
}

console.log(price.endDate)
function getTodayDate(): { day: number, month: number, year: number } {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Months are zero-based in JavaScript
    const year = today.getFullYear();

    return {
        day: day,
        month: month,
        year: year
    };
}

// Usage example
const todayDate = getTodayDate();

 
   const handleUpload = () => {
     if (selectedFiles.length === 0) return;
 
     // Replace the following URL with your actual API endpoint
     // YOUR_API_ENDPOINT_HERE
     
 
     const formData = new FormData();
     selectedFiles.forEach(file => {
       formData.append('files', file);
     });
 
     
   };

   
   const [properties, setProperties] = useState<Array<{ name: string; value: string }>>([]);
   const maxProperties:number = 10
   console.log(properties)
   const handleAddProperty = () => {
     if (properties.length < maxProperties) {
       setProperties([...properties, { name: '', value: '' }]);
     }
   };
 
   const handleRemoveProperty = (index: number) => {
     const updatedProperties = [...properties];
     updatedProperties.splice(index, 1);
     setProperties(updatedProperties);
   };
 
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
     const { name, value } = e.target;
     const updatedProperties = [...properties];
     updatedProperties[index] = { ...updatedProperties[index], [name]: value };
     setProperties(updatedProperties);
   };




   
 //  handlers

 console.log(organization)
  const handelOrganizationChange = (event:ChangeEvent<HTMLInputElement> | SelectChangeEvent) =>{
      const {value,name} = event.target
      setOrganization({
       ...organization,
       [name]: value as string,
      })
  }
  const [selectedValue, setSelectedValue] = useState<string>('option1');
  console.log(selectedValue)
    const handelChangeSelectedValue = (e:ChangeEvent<HTMLSelectElement>)=> {
     setSelectedValue(e.target.value)
     
    }
   
   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files) {
        const fileArray = Array.from(files);
        setSelectedFiles(fileArray);
  
        const previewArray = fileArray.map(file => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          return new Promise<string>((resolve) => {
            reader.onloadend = () => {
              resolve(reader.result as string);
            };
          });
        });
  
        const pathArray = fileArray.map(file => URL.createObjectURL(file));
  
        Promise.all(previewArray).then(previewUrls => {
          setPreviews(previewUrls);
          setFilePaths(pathArray);
  
          // عرض حجم الصورة في ال Kbyte
          fileArray.forEach(file => {
            const kbSize = bytesToKb(file.size);
            console.log(`حجم الصورة: ${kbSize} KB`);
          });
        });
      }
    };

   const handleRemoveImage = (index: number) => {
     const newSelectedFiles = [...selectedFiles];
     newSelectedFiles.splice(index, 1);
     setSelectedFiles(newSelectedFiles);
 
     const newPreviews = [...previews];
     newPreviews.splice(index, 1);
     setPreviews(newPreviews);
 
     const newFilePaths = [...filePaths];
     newFilePaths.splice(index, 1);
     setFilePaths(newFilePaths);
   };

   
   console.log(ProductInformation)
   const handelChange = (event:ChangeEvent<HTMLInputElement>) =>{
      const {value,name} = event.target
      setProductInformation({
          ...ProductInformation,
          [name]:value
      })
   }


   
  
   

   const url:string = "/api/Product"
   const onSubmit =async (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    try {
      const res =await axiosInstance.post(url,{properties,selectedValue,...organization,...price,...ProductInformation})
     console.log(res)
    } catch (error) {
      console.log(error)
    }
    
     
   
  }
   
  
  

   return (
      <div className="w-full">
         <form onSubmit={onSubmit} className="grid grid-cols-3 gap-6 p-5">
            <div className="col-span-2 space-y-3">
                <div className="border rounded-md shadow-md">
                    <div className="flex p-5 border-b  content-center">
                       <h4 className="font-bold">Product information</h4>
                     <br />
                 </div>
            <div className="p-5 space-y-6">
               <div className="flex flex-col space-y-2 ">
                  <label htmlFor="product-name">product Name</label>
                  <InputComponent value={ProductInformation.productName} onChange={handelChange} className="border rounded-md   w-full p-2 h-11  transition focus:shadow-xl focus:outline-double focus:outline-none " placeholder="product name....." type="text" id="productName" name="productName"/>
               </div>

               <div className="grid grid-cols-2 gap-8">
               <div className="flex flex-col space-y-2">
                  <label htmlFor="SKU">SKU</label>
                  <InputComponent value={ProductInformation.SKU} onChange={handelChange} className="border rounded-md   h-11 p-2 transition focus:shadow-xl focus:outline-double focus:outline-none" placeholder="SKU....." type="text" id="SKU" name="SKU"/>
               </div>
               <div className="flex flex-col space-y-2 ">
                  <label htmlFor="unit-in-stock">unit in stock</label>
                  <InputComponent value={ProductInformation.unitInStock} onChange={handelChange} className="border rounded-md  h-11 p-2 transition focus:shadow-xl focus:outline-double focus:outline-none" placeholder="unit in stock....." type="number" id="unitInStock" name="unitInStock"/>
               </div>
               </div>

               <div className="space-y-2 mb-5">
               <label htmlFor="discription">Discription</label>
               <InputComponent value={ProductInformation.Discription} onChange={handelChange} className=" border rounded-md  w-full h-11 p-2 transition focus:shadow-xl focus:outline-double focus:outline-none" placeholder="Type your discription....." type="text" id="Discription" name="Discription"/>
               </div>
            </div>
        </div>

        {/* ProductInformation */}




        <div className="mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Upload Images</h1>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {previews.map((preview, index) => (
          <div key={index} className="relative rounded-lg overflow-hidden">
            <img src={preview} alt={`Selected ${index}`} className="w-full h-40 object-cover" />
            <div className="absolute top-2 right-2">
              <button
                onClick={() => handleRemoveImage(index)}
                className="bg-gray-800 text-white rounded-full p-2 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white px-2 py-1 text-sm">
              {filePaths[index]}
            </div>
            <div className="absolute bottom-2 left-2 bg-gray-800 bg-opacity-75 text-white px-2 py-1 rounded-md">
              {bytesToKb(selectedFiles[index].size)} KB
            </div>
            <div className="absolute top-6 left-2 transform -translate-y-1/2 bg-green-500 text-white font-semibold py-1 px-2 rounded-full">
              Selected
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <label htmlFor="fileInput" className="cursor-pointer bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
          Select Images
        </label>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={handleUpload}
          className={`ml-4 bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 ${selectedFiles.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={selectedFiles.length === 0}
        >
          Upload
        </button>
      </div>
    </div>
             

              {/* DynamicPropertiesInput*/}
              <div className="dynamic-properties-input p-4 border border-gray-200 rounded-md shadow-md">
      <h3 className="text-lg font-bold mb-4">Variants:</h3>
      {properties.map((property, index) => (
        <div key={index} className="flex items-center space-x-4 mb-2">
          <input
            type="text"
            name="name"
            value={property.name}
            onChange={(e) => handleChange(e, index)}
            className="px-3 py-2 w-1/3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Feature name"
          />
          <input
            type="text"
            name="value"
            value={property.value}
            onChange={(e) => handleChange(e, index)}
            className="px-3 py-2 w-1/3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="The value of the property"
          />
          <button
            type="button"
            onClick={() => handleRemoveProperty(index)}
            className="px-3 py-2 text-sm text-red-500 border border-red-500 rounded-md hover:bg-red-500 hover:text-white focus:outline-none focus:bg-red-500 focus:text-white"
          >
            Delete
          </button>
        </div>
      ))}
      {properties.length < maxProperties && (
        <button
          type="button"
          onClick={handleAddProperty}
          className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Add a property
        </button>
      )}
    </div>

            </div>
            <div className="space-y-5">
            <div className="border rounded-md shadow-md">
            <div className="flex p-5 border-b  content-center">
                <h4 className="font-bold">Pricing</h4>
                <br />
            </div>
            <div className="p-5 space-y-3">
               <div className="flex flex-col space-y-2 ">
                  <label htmlFor="price">price</label>
                  <InputComponent value={price.priceValue} onChange={handlerPriceChange} className="border rounded-md w-full p-2 h-11  transition focus:shadow-xl focus:outline-double focus:outline-none " placeholder="0.00" type="number" id="priceValue" name="priceValue"/>
               </div>
               <div className="flex place-content-between">
                   <p>discount?</p>
                   <Switch checked={enabled} onChange={setEnabled} as={Fragment}>
                       {({ checked, disabled }) => (
                           <button
                           className={clsx(
                           'group inline-flex h-6 w-11 items-center rounded-full',
                            checked ? 'bg-blue-600' : 'bg-gray-200',
                            disabled && 'cursor-not-allowed opacity-50'
                        )}>
                                <span className="sr-only">Enable notifications</span>
                                <span
                                className={clsx('size-4 rounded-full bg-white transition', checked ? 'translate-x-6' : 'translate-x-1')}/>
                            </button>)}
                   </Switch>
               </div>
               {enabled ? <div className="flex flex-col space-y-6">
                <div>
                <label htmlFor="discount">value</label>
                <InputComponent value={price.discount} onChange={handlerPriceChange} className="border rounded-md w-full p-2 h-11  transition focus:shadow-xl focus:outline-double focus:outline-none " placeholder="0.00" type="number" id="discount" name="discount"/>
                </div>
                 <div className="flex items-center place-content-between">
                    <label htmlFor="end-date">end date</label>
                    <InputComponent value={price.endDate} onChange={handlerPriceChange} className="border rounded-md p-2 transition focus:shadow-xl focus:outline-double focus:outline-none" type="date"  min={`${todayDate.year}-${todayDate.month}-${todayDate.day}`.toString()} name="end-date" id="end-date" />
                 </div>
               </div>:null}
               
            </div>
        </div>
             
              
              <div className="border rounded-md shadow-md ">
            <div className="flex p-5 border-b  content-center">
                <h4 className="font-bold">Organization</h4>
                <br />
            </div>
            <div className="p-5 space-y-5">
               <div className="flex flex-col space-y-2 ">
                  <label htmlFor="Vendor">Vendor</label>
                  <InputComponent value={organization.Vendor} onChange={handelOrganizationChange} className="border rounded-md w-full p-2 h-11  transition focus:shadow-xl focus:outline-double focus:outline-none " placeholder="eg.Nike" type="text" id="Vendor" name="Vendor"/>
               </div>
               <div className="flex flex-col space-y-2 ">
                  <label htmlFor="combanyName">combany name</label>
                  <InputComponent value={organization.combanyName} onChange={handelOrganizationChange} className="border rounded-md w-full p-2 h-11  transition focus:shadow-xl focus:outline-double focus:outline-none " placeholder="combany name" type="text" id="combanyName" name="combanyName"/>
               </div>
               <div className="flex flex-col space-y-2 ">
                  <label htmlFor="contactName">contact name</label>
                  <InputComponent value={organization.contactName} onChange={handelOrganizationChange} className="border rounded-md w-full p-2 h-11  transition focus:shadow-xl focus:outline-double focus:outline-none " placeholder="contact Name" type="text" id="contactName" name="contactName"/>
               </div>
               <div>
                      
               <div className="relative inline-block w-full text-gray-700">
               <select className="w-full h-10 pl-3 pr-10 text-base placeholder-gray-600 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:shadow-outline focus:border-blue-500" value={selectedValue} onChange={handelChangeSelectedValue}>
                 {options.map((option) => (
                   <option key={option.value} value={option.value}>
                {option.label}
                   </option>
                  ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5.292 7.707a1 1 0 011.414 0L10 11.001l3.293-3.294a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
               </div>

               </div>
               <div className="flex flex-col space-y-2 ">
                  <label htmlFor="Tags">Tags</label>
                  <InputComponent value={organization.Tags} onChange={handelOrganizationChange} className="border rounded-md w-full p-2 h-11  transition focus:shadow-xl focus:outline-double focus:outline-none " placeholder="Enter tags here" type="text" id="Tags" name="Tags"/>
               </div>
               <div className="flex flex-col space-y-2 ">
                  <label htmlFor="brand">brand</label>
                  <InputComponent value={organization.brand} onChange={handelOrganizationChange} className="border rounded-md w-full p-2 h-11  transition focus:shadow-xl focus:outline-double focus:outline-none " placeholder="brand tags here" type="text" id="brand" name="brand"/>
               </div>
            </div>
        </div>

            </div>
              {/* <AddProductForm loading={true}/> */}
              <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
      <button
        
        className="bg-blue-500 text-white py-3 px-6 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:bg-blue-500 focus:ring-opacity-50"
      >
        Add Product
      </button>
    </div>
         </form>
      </div>
   )
}

export default AddProduct