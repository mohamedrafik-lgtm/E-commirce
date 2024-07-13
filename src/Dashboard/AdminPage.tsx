import { Pricing } from "./Pricing"
import Organization from "./Organization"
import DynamicPropertiesInput from "./DynamicPropertiesInput"
import AddProductForm from "./postData"
import { ChangeEvent, FormEvent, useState } from "react"
import InputComponent from "../components/ui/InputComponent"
import { IProductInformations } from "../interface"
import { AddProductValidation } from "../validations/AddProductValidation"


const AdminPage = () => {
   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
   const [previews, setPreviews] = useState<string[]>([]);
   const [filePaths, setFilePaths] = useState<string[]>([]);
   const [ProductInformation,setProductInformation] = useState<IProductInformations>({
      productName:'',
      Discription:'',
      SKU: '',
      unitInStock:0
   })
   const bytesToKb = (bytes: number): number => {
     return Math.round(bytes / 1024); // تحويل البايت إلى Kbyte وتقريبه
   };
 
  
 
   const handleUpload = () => {
     if (selectedFiles.length === 0) return;
 
     // Replace the following URL with your actual API endpoint
     // YOUR_API_ENDPOINT_HERE
     const uploadUrl = '';
 
     const formData = new FormData();
     selectedFiles.forEach(file => {
       formData.append('files', file);
     });
 
     fetch(uploadUrl, {
       method: 'POST',
       body: formData,
     })
       .then(response => response.json())
       .then(data => {
         console.log('Success:', data);
       })
       .catch(error => {
         console.error('Error:', error);
       });
   };
 

   // handlers
   
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


   // handlers 
   const onSubmitHandlear = () => {
    //  errors massages
    
   }
   const onSubmit = (e:FormEvent<HTMLFormElement>):void =>{
     e.preventDefault()
     // call api here
     const errors = AddProductValidation(ProductInformation)
     // check if an any property has a value of "" && check if all properties have a value of ""
     console.log(errors)
     
     const hasErrorMsg = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "");
    console.log(hasErrorMsg)
     if (!hasErrorMsg) {
       return;
     }
     
     console.log("success")
  }
   
   return (
      <div>
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

              <DynamicPropertiesInput maxProperties={10} propertyOptions={["color","size","modil"]}/>
            </div>
            <div className="space-y-5">
              <Pricing/>
              <Organization/>
            </div>
              <AddProductForm loading={false} onSubmit={onSubmitHandlear}/>
         </form>
      </div>
   )
}

export default AdminPage