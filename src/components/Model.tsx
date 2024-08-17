import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ChangeEvent, ReactNode, useState } from 'react'
import InputComponent from "../components/ui/InputComponent"
import { updateProductInputData } from '../data'

interface IProp{
  productId: number;
}
export default function Modal({productId}:IProp) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [propertyNames, setPropertyNames] = useState<string[]>([]);
  const [propertyValues, setPropertyValues] = useState<string[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePaths, setFilePaths] = useState<string[]>([]);
  
  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  const bytesToKb = (bytes: number): number => {
    return Math.round(bytes / 1024);
  };


  // handlers
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

  
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const maxProperties: number = 4;

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

  // render input element
  const renderInput = updateProductInputData.map((data):ReactNode =>{
    return <div className='flex items-center' key={data.id} id={data.name}>
    {data.name === "Discontinued" ? <label className='mr-2' htmlFor={data.name}>{data.label} : </label> : null}
    <InputComponent key={data.id} type={data.type}  name={data.name} id={data.id} placeholder={data.placeholder} className="custom-input"/>
    </div>
}) 


  const handleTagRemove = (index: number) => {
    setTags(prevTags => prevTags.filter((_, i) => i !== index));
  };


  

  return (
    <>
      <Button
        onClick={open}
        className="rounded-md bg-green-500 py-2 px-2 text-sm font-medium text-white focus:outline-none data-[hover]:bg-green-600 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        Update Product
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-10   focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10  w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="border bg-black  rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 mb-3 font-medium text-balck">
                Update product : {productId}
              </DialogTitle>

              <div className='flex w-full space-x-2'>
              <div className='p-3 grid grid-cols-2 space-x-2 space-y-2 border border-gray-200 rounded-md shadow-md'>
              {renderInput}
                <div className='grid col-span-2'>

                    <div className="flex  flex-wrap max-w-96 items-center p-4 border rounded-lg  shadow-md">
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
                            className="tags flex-1 border-none outline-none p-2"
                          />
      
                    </div>
                </div>
              </div>


              {/* dynamic input product property  */}
              <div className="dynamic-properties-input  col-span-2 p-4  border border-gray-200 rounded-md shadow-md">
      <h3 className="text-lg font-bold mb-4">Product Features:</h3>
      {propertyNames.map((name, index) => (
        <div key={index} className="grid  items-center mb-2">
          <div className='col-span-2'>
          <button
            type="button"
            onClick={() => handleRemoveProperty(index)}
            className="px-3 py-2 w-full  text-center text-sm text-white border bg-red-500 rounded-md hover:text-red-500 hover:bg-white focus:outline-none focus:border-red-500"
          >
            Delete
          </button>
          </div>
          <div className='flex space-x-3 mt-2'>
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e, index)}
            className="px-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="property Name"
          />
          
          <input
            type="text"
            value={propertyValues[index]}
            onChange={(e) => handleValueChange(e, index)}
            className="px-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="property value"
          />
          </div>
          
          
           
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
        
        </div>
        
      )}
    </div>   
    <div className=" p-6  rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Upload Images</h1>
      <div className={`${previews.length ? "border" : null} space-y-2 rounded-md mb-3 p-3`}>
        {previews.map((preview, index) => (
              <div key={index} className="rounded-lg items-center border flex  justify-between p-1 w-96 overflow-hidden">
            <img src={preview} alt={`Selected ${index}`} className="h-11 w-11 rounded-md object-contain" />
            <div className=" p-2  bg-opacity-75  rounded-md">
              <p>{preview.slice(0,32)}</p>
            </div>
            <div>
              <button
                onClick={() => handleRemoveImage(index)}
                className="bg-blue-500 text-white rounded-full p-1 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          
        ))}
      </div>
      

        {previews.length >= 5 ? null: <div className="flex flex-col space-y-3 justify-center items-center">
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
          </div>}
        
        
      
      
    </div>
              </div>
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-blue-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}
                >
                  Ubdate product
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}