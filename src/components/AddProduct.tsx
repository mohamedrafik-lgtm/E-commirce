import { formInputList } from "../data"
import InputComponent from "./ui/InputComponent"



const AddProduct = () => {
    //  render fom inputs 
    const inputsProduct = formInputList.map( (input) => <div className="w-100%">
             <label htmlFor={input.id}>{input.label}</label>
           <InputComponent
           type={input.type}
           name={input.name}
           id={input.id}
           required
           /> 
    </div>)

    return <div className=" flex flex-col w-1/3 space-y-3 p-5 border-2 border-slate-400 rounded-md">
        <h3 className="text-white bg-blue-600 p-3 rounded-md text-2xl">Product details</h3>
        <hr/>
        {inputsProduct}

         <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md text-lg">Add Product</button>
    </div>

}

export default AddProduct