import { ChangeEvent, FormEvent, useState,Fragment } from "react";
import InputComponent from "../components/ui/InputComponent";
import { IPrice, IProductInformations } from "../interface";
import { Switch } from '@headlessui/react';
import clsx from 'clsx';
import axiosInstance from "../config/axios.config";
import { IOrganization } from "../interface";
import { AddProductValidation } from "../validations";
import InputErrorMsg from "../components/ui/InputErrorMsg";
import CircularProgress from '@mui/material/CircularProgress';
import toast from "react-hot-toast";
import ScrollAnimatedComponent from "@/components/ScrollAnimatedComponent";

const AddProduct = () => {
    
  const options = [
    { value: 'nvidia', label: 'nvidia' },
    { value: 'AMD', label: 'AMD' },
    { value: 'intel', label: 'intel' },
    { value: 'Apple', label: 'Apple' },
  ];
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [filePaths, setFilePaths] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [discontinued, setDiscontinued] = useState<boolean>(false);
  const [isArchived, setIsArchived] = useState<boolean>(false);
  const [productCode, setProductCode] = useState<string>('');
  const [propertyNames, setPropertyNames] = useState<string[]>([]);
  const [propertyValues, setPropertyValues] = useState<string[]>([]);
  const [ProductInformation, setProductInformation] = useState<IProductInformations>({
    productName: '',
    Discription: '',
    SKU: '',
    unitInStock: 0
  });
  const [enabled, setEnabled] = useState<boolean>(false);
  const [price, setPrice] = useState<IPrice>({
    priceValue: 0,
    discount: 0,
    startDate: '',
    endDate: '',
  });

  const [organization, setOrganization] = useState<IOrganization>({
    Vendor: '',
    contactName: '',
    combanyName: '',
    brand: '',
  });
  const [errors,setErrors] = useState({
    productName: '',
    Discription: '',
    SKU: '',
    unitInStock: '',
    priceValue: '',
    discount: '',
    startDate: '',
    endDate: '',
    Vendor: '',
    contactName: '',
    combanyName: '',
    productCode:'',
    propertyNames:'',
    propertyValues:'',
    filePaths:'',
    tags:'',
    brands:''
  })
   console.log(errors)

  //  handlers
  const bytesToKb = (bytes: number): number => {
    return Math.round(bytes / 1024);
  };

  const handlerPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setPrice({
      ...price,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]:""
    })
  };

  const maxProperties: number = 10;

  const handleAddProperty = () => {
    if (propertyNames.length < maxProperties) {
      setPropertyNames([...propertyNames, '']);
      setPropertyValues([...propertyValues, '']);
    }
  };

  const handleRemoveProperty = (index: number) => {
    const updatedNames = [...propertyNames];
    const updatedValues = [...propertyValues];
    updatedNames.splice(index, 1);
    updatedValues.splice(index, 1);
    setPropertyNames(updatedNames);
    setPropertyValues(updatedValues);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedNames = [...propertyNames];
    updatedNames[index] = e.target.value;
    setPropertyNames(updatedNames);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedValues = [...propertyValues];
    updatedValues[index] = e.target.value;
    setPropertyValues(updatedValues);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ' && inputValue.trim()) {
      event.preventDefault();
      const trimmedValue = inputValue.trim();
      if (!tags.includes(trimmedValue)) {
        setTags(prevTags => [...prevTags, trimmedValue]);
      }
      setInputValue("");
    }
  };

  const handleTagRemove = (index: number) => {
    setTags(prevTags => prevTags.filter((_, i) => i !== index));
  };

  const handelOrganizationChange = (event: ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target;
    setOrganization({
      ...organization,
      [name]: value as string,
    });
    setErrors({
      ...errors,
      [name]:""
    })
  };

  const [selectedValue, setSelectedValue] = useState<string>('');
  const handelChangeSelectedValue = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
    
  };

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

  const handelChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProductInformation({
      ...ProductInformation,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]:""
    })
  };

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };
  const url: string = "/api/Product";
  const [loading, setLoading] = useState(false);
  

  // add product request
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    
    
    const errors = AddProductValidation({productName: ProductInformation.productName,SKU: ProductInformation.SKU,Discription: ProductInformation.Discription,combanyName:organization.combanyName,contactName:organization.contactName,
      startDate: startDate,endDate: endDate,filePaths:filePaths,propertyNames:propertyNames,discount:price.discount,productCode:productCode,propertyValues:propertyValues,
      tags:tags,priceValue:price.priceValue,unitInStock:ProductInformation.unitInStock,Vendor:organization.Vendor,brand:organization.brand
    })
    console.log(errors)
    const hasErrorMsg = Object.values(errors).some(value => value === '') && Object.values(errors).every(value => value === '')
    if(!hasErrorMsg){
      setErrors(errors)
      return;
    }
    const previewsString: string = previews.join(',');
    const formData = new FormData();
    formData.append('ProductName', ProductInformation.productName);
    formData.append('UnitPrice', price.priceValue.toString());
    formData.append('Description', ProductInformation.Discription);
    formData.append('Brand', organization.brand);
    formData.append('Category', selectedValue);
    formData.append('UnitsInStock', ProductInformation.unitInStock.toString());
    formData.append('ReorderLevel', '5');
    formData.append('Discontinued', discontinued.toString());
    formData.append('IsArchived', isArchived.toString());
    formData.append('ProductCode', productCode);
    formData.append('CompanyName', organization.combanyName);
    formData.append('ContactName', organization.contactName);
    formData.append('ImageUrls', previewsString);
    tags.forEach(tag => formData.append('Tags', tag));
    formData.append('Vendor', organization.Vendor);
    propertyNames.forEach(( _,index) => formData.append( "ProductAttributes",propertyNames[index]));
    propertyValues.forEach((_, index) => formData.append( "ProductAttributesValues",propertyValues[index]));
    selectedFiles.forEach(file => formData.append('ProductImages', file));
    formData.append('DiscountAmount', price.discount.toString());
    formData.append('DiscountStartDate', startDate);
    formData.append('DiscountEndDate', endDate);
    try {
      const {status} = await axiosInstance.post(url, formData);
      
      if (status === 200){
        toast.success("The product has been added successfully.", {
          position: "top-right",
          duration: 5000,
          style: {
            backgroundColor: "#90ee90",
            color: "#000000",
            width: "fit-content",
          },
        });
      }
      
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false)
    }
  };
   
  


   return (
      <div className="w-full">
         <form onSubmit={onSubmit} className="grid grid-cols-3 gap-6 p-5">
            <div className="col-span-2 space-y-3">
                
                 <ScrollAnimatedComponent direction="top">
                 <div style={{
          borderRadius:"15px"
        }} className="border rounded-md shadow-md">
                    <div className="flex p-5 border-b  content-center">
                       <h4 className="font-bold">Product information</h4>
                     <br />
                 </div>
            <div className="p-5 space-y-6">
               <div className="flex flex-col space-y-2 ">
                  <label htmlFor="product-name">product Name</label>
                  <InputComponent value={ProductInformation.productName} onChange={handelChange} className="border rounded-md   w-full p-2 h-11  transition focus:shadow-xl focus:outline-double focus:outline-none " placeholder="product name....." type="text" id="productName" name="productName"/>
                  <InputErrorMsg msg={errors.productName}/> 
               </div>

               <div className="grid grid-cols-2 gap-8">
               <div className="flex flex-col space-y-2">
                  <label htmlFor="SKU">SKU</label>
                  <InputComponent value={ProductInformation.SKU} onChange={handelChange} className="border rounded-md   h-11 p-2 transition focus:shadow-xl focus:outline-double focus:outline-none" placeholder="SKU....." type="text" id="SKU" name="SKU"/>
                  {errors ? <InputErrorMsg msg={errors.SKU}/> : null}
               </div>
               <div className="flex flex-col space-y-2 ">
                  <label htmlFor="unit-in-stock">unit in stock</label>
                  <InputComponent value={ProductInformation.unitInStock} onChange={handelChange} className="border rounded-md  h-11 p-2 transition focus:shadow-xl focus:outline-double focus:outline-none" placeholder="unit in stock....." type="number" id="unitInStock" name="unitInStock"/>
                  {errors ? <InputErrorMsg msg={errors.unitInStock}/> : null}
               </div>
               </div>

               <div className="space-y-2 mb-5">
                  <label htmlFor="discription">Discription</label>
                  <InputComponent value={ProductInformation.Discription} onChange={handelChange} className=" border rounded-md  w-full h-11 p-2 transition focus:shadow-xl focus:outline-double focus:outline-none" placeholder="Type your discription....." type="text" id="Discription" name="Discription"/>
                  {errors ? <InputErrorMsg msg={errors.Discription}/> : null}
               </div>
               
             
               <div className="mb-4 flex items-center relative">
                      <input
                        type="checkbox"
                        id="discontinued"
                        checked={discontinued}
                        onChange={(e) => setDiscontinued(e.target.checked)}
                        className="checkbox h-5 w-5 transition duration-150 ease-in-out"
                      />
                      <label className="text-gray-700 text-sm font-bold ml-2" htmlFor="discontinued">
                        Discontinued
                      </label>
                    </div>
                    <div className="mb-4 flex items-center relative">
                      <input
                        type="checkbox"
                        id="isArchived"
                        checked={isArchived}
                        onChange={(e) => setIsArchived(e.target.checked)}
                        className="checkbox h-5 w-5 transition duration-150 ease-in-out"
                      />
                      <label className="text-gray-700 text-sm font-bold ml-2" htmlFor="isArchived">
                        Is Archived
                      </label>
               </div>
              
            </div>
            </div>
                 </ScrollAnimatedComponent>
         {/* upload images */}
         <ScrollAnimatedComponent direction="left">

        <div style={{
          borderRadius:"15px"
        }} className="mt-10 p-6 bg-white rounded-lg shadow-md ">
      <h1 className="text-3xl font-bold mb-6 text-center">Upload Images</h1>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {previews.map((preview, index) => (
          <div key={index} className="relative rounded-lg overflow-hidden">
            <img src={preview} alt={`Selected ${index}`} className="w-full h-40 object-contain" />
            <div className="absolute top-2 right-2">
              <button
                onClick={() => handleRemoveImage(index)}
                className="bg-gray-800 text-white rounded-full p-2 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="absolute bottom-2 h-fit top-2 left-2 bg-gray-800 bg-opacity-75 text-white px-2 py-1 rounded-md">
              {bytesToKb(selectedFiles[index].size)} KB
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col space-y-3 justify-center items-center">
        <label htmlFor="fileInput" className="cursor-pointer bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
          Select Images
        </label>
        <InputErrorMsg msg={errors.filePaths}/> 
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        
      </div>
      
        </div>
         </ScrollAnimatedComponent>
             

              {/* DynamicPropertiesInput*/}
              <ScrollAnimatedComponent direction="bottom">
              <div style={{
          borderRadius:"15px"
        }} className="dynamic-properties-input p-4 border border-gray-200 rounded-md shadow-md">
      <h3 className="text-lg font-bold mb-4">Product Features:</h3>
      {propertyNames.map((name, index) => (
        <div key={index} className="flex items-center space-x-4 mb-2">
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e, index)}
            className="px-3 py-2 w-1/3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="property Name"
          />
          
          <input
            type="text"
            value={propertyValues[index]}
            onChange={(e) => handleValueChange(e, index)}
            className="px-3 py-2 w-1/3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="property value"
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
      {propertyNames.length < maxProperties && (
        <div>
          <button
          type="button"
          onClick={handleAddProperty}
          className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          add property
          
        </button>
        <InputErrorMsg msg={errors.propertyValues}/>
        </div>
        
      )}
              </div>
              </ScrollAnimatedComponent>

            </div>

            <ScrollAnimatedComponent direction="right">
            <div className="space-y-5">
            <div style={{
              borderRadius:"15px"
              }} className="border rounded-md shadow-md">
            <div className="flex p-5 border-b  content-center">
                <h4 className="font-bold">Pricing</h4>
                <br />
            </div>
            <div className="p-5 space-y-3">
               <div className="flex flex-col space-y-2 ">
                  <label htmlFor="price">price</label>
                  <InputComponent value={price.priceValue} onChange={handlerPriceChange} className="border rounded-md w-full p-2 h-11  transition focus:shadow-xl focus:outline-double focus:outline-none " placeholder="0.00" type="number" id="priceValue" name="priceValue"/>
                  <InputErrorMsg msg={errors.priceValue}/> 
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
                <InputErrorMsg msg={errors.discount}/> 
                </div>

                <div className="flex flex-col  gap-4 bg-white">
      <div className="flex justify-between ">
        <label htmlFor="start-date" className="mb-2 text-lg font-medium text-gray-700">
          Start Date:
        </label>
        <div>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={handleStartDateChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
          <InputErrorMsg msg={errors.startDate}/>
        </div>
      </div>
        
      <div className="flex justify-between">
        <label htmlFor="end-date" className="mb-2 text-lg font-medium text-gray-700">
          End Date:
        </label>
        <div>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={handleEndDateChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <InputErrorMsg msg={errors.endDate}/>
        </div>
      </div>
        
    </div>
                 
               </div>:null}
               
            </div>
            </div>
             
             
              <div style={{
          borderRadius:"15px"
        }} className="border rounded-md shadow-md ">
              <div className="flex p-5 border-b  content-center">
                <h4 className="font-bold">Organization</h4>
                <br />
            </div>
            <div className="p-5 space-y-5">
               <div className="flex flex-col space-y-2 ">
                  <label htmlFor="Vendor">Vendor</label>
                  <InputComponent value={organization.Vendor} onChange={handelOrganizationChange} className="border rounded-md w-full p-2 h-11  transition focus:shadow-xl focus:outline-double focus:outline-none " placeholder="eg.Nike" type="text" id="Vendor" name="Vendor"/>
                  <InputErrorMsg msg={errors.Vendor}/>
               </div>
               <div className="flex flex-col space-y-2 ">
                  <label htmlFor="combanyName">combany name</label>
                  <InputComponent value={organization.combanyName} onChange={handelOrganizationChange} className="border rounded-md w-full p-2 h-11  transition focus:shadow-xl focus:outline-double focus:outline-none " placeholder="combany name" type="text" id="combanyName" name="combanyName"/>
                  <InputErrorMsg msg={errors.combanyName}/>
               </div>
               <div className="flex flex-col space-y-2 ">
                  <label htmlFor="contactName">contact name</label>
                  <InputComponent value={organization.contactName} onChange={handelOrganizationChange} className="border rounded-md w-full p-2 h-11  transition focus:shadow-xl focus:outline-double focus:outline-none " placeholder="contact Name" type="text" id="contactName" name="contactName"/>
                  <InputErrorMsg msg={errors.contactName}/>
               </div>
               <div>
                      
               <div className="relative inline-block space-y-3 w-full text-gray-700">
                <label htmlFor="category">category</label>
               <select id="category" className="w-full h-10 pl-3 pr-10 text-base placeholder-gray-600 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:shadow-outline focus:border-blue-500" value={selectedValue} onChange={handelChangeSelectedValue}>
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
               <div  className="flex flex-wrap items-center p-4 border rounded-lg bg-white shadow-md">
               <label htmlFor="tags">tags:</label>
      {tags.map((tag, index) => (
        <span
          key={index}
          className="bg-blue-500 text-white px-3 py-1 m-1 rounded-full text-sm flex items-center"
        >
          {tag}
          <button
            type="button"
            onClick={() => handleTagRemove(index)}
            className="ml-2 text-gray-200 hover:text-white"
          >
            &times;
          </button>
        </span>
      ))}
      
      <input
      id="tags"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={"text"}
        className="flex-1 border-none outline-none p-2"
      />
      <InputErrorMsg msg={errors.tags}/>
               </div>

    <div  className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productCode">
        Product Code
      </label>
      <input
        type="text"
        id="productCode"
        value={productCode}
        onChange={(e) => setProductCode(e.target.value)}
        className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
      <InputErrorMsg msg={errors.productCode}/>
    </div>
    
               <div className="flex flex-col space-y-2 ">
                  <label htmlFor="brand">brand</label>
                  <InputComponent value={organization.brand} onChange={handelOrganizationChange} className="border rounded-md w-full p-2 h-11  transition focus:shadow-xl focus:outline-double focus:outline-none " placeholder="brand tags here" type="text" id="brand" name="brand"/>
                  <InputErrorMsg msg={errors.brands}/>
               </div>
            </div>
        </div>

            </div>
            </ScrollAnimatedComponent>
            
              {/* <AddProductForm loading={true}/> */}
              <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
              {loading ? <CircularProgress />   : <button
        
        className="bg-blue-500  text-white py-3 px-6 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:bg-blue-500 focus:ring-opacity-50"
      >
      add Product
      </button>}
      
      
    </div>
         </form>
      </div>
   )
}

export default AddProduct