import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ChangeEvent, ReactNode, useState } from 'react'
import InputComponent from "../components/ui/InputComponent"
import { updateProductInputData } from '../data'
export default function Modal() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [propertyNames, setPropertyNames] = useState<string[]>([]);
  const [propertyValues, setPropertyValues] = useState<string[]>([]);
  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }


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
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const maxProperties: number = 5;

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
        className="rounded-md bg-blue-600 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        Open dialog
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-10  focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10  w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="border bg-black  rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-balck">
                Update product : product id
              </DialogTitle>

              <div className='flex space-x-2'>
              <div className='p-3 grid grid-cols-2 space-x-2 space-y-2 border border-gray-200 rounded-md shadow-md'>
              {renderInput}
                <div className='grid col-span-2'>

                    <div className="flex  flex-wrap  items-center p-4 border rounded-lg bg-white shadow-md">
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
      
                    </div>
                </div>
              </div>
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
    
              </div>
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}
                >
                  Got it, thanks!
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}