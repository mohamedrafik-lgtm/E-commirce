import { IAddDiscountInput, ILogin, IRegister, IUpdateProductInputData } from "../interface";

import { v4 as uuid } from 'uuid';


interface FormBillingDetails{
    name:string;
    label:string;
    type:string;
    validation:
      {
        pattern?:RegExp;
        required:boolean,
        minLength:number
      }
    
  }
const RENDERER_INPUTS:IRegister[] = [

    {
        name:"username",
        plassholder:"username",
        type:"text",
        validation:{
            required:true,
            minLength:5,
            
        }
    },

    {
        name:"email",
        plassholder:"enter email heer",
        type:"email",
        validation:{
            pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            required:true,
            minLength:7,
        }
    },
    {
        name:"password",
        plassholder:"password",
        type:"password",
        validation:{
            required:true,
            minLength:7,
        }
    },
    {
        name:"confirmPassword",
        plassholder:"confirm password",
        type:"password",
        validation:{
            required:true,
            minLength:7,
        }
    }
]

export const LOGIN_INPUT:ILogin[] = [
    {
        name:"email",
        plassholder:"enter email heer",
        label:"email",
        type:"email",
        validation:{
            pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            required:true,
            minLength:7,
        }
    },
    {
        name:"password",
        plassholder:"password",
        label:"password",
        type:"password",
        validation:{
            required:true,
            minLength:7,
        }
    },


]


export const updateProductInputData:IUpdateProductInputData[] = [
    {
        name:"ProductName",
        id:uuid(),
        type:"text",
        placeholder:"Enter Product Name",
    },
    {
        name:"UnitPrice",
        id:uuid(),
        type:"number",
        placeholder:"Enter Unit Price",
    },
    {
        name:"Description",
        id:uuid(),
        type:"text",
        placeholder:"Enter Description",
    },
    {
        name:"Brand",
        id:uuid(),
        type:"text",
        placeholder:"Enter Brand",
    },
    {
        name:"Category",
        type:"text",
        id:uuid(),
        placeholder:"Enter Category",
    },
    {
        name:"UnitsInStock",
        type:"text",
        id:uuid(),
        placeholder:"Units In Stock",
    },
    {
        name:"ReorderLevel",
        id:uuid(),
        type:"text",
        placeholder:"ReorderLevel",
    },
    
    {
        name:"ProductCode",
        id:uuid(),
        type:"text",
        placeholder:"Enter Product Code",
    },
    {
        name:"CompanyName",
        id:uuid(),
        type:"text",
        placeholder:"Enter CompanyName",
    },
    {
        name:"ContactName",
        id:uuid(),
        type:"text",
        placeholder:"Enter Contact Name",
    },
    // {
    //     name:"ContactName",
    //     id:uuid(),
    //     type:"text",
    //     placeholder:"Enter Contact Name",
    // },
    {
        name:"Discontinued",
        id:uuid(),
        type:"checkbox",
        label:"Discontinued ",
        placeholder:"Discontinued",
    },


]


export const AddDiscountInput:IAddDiscountInput[] = [{
  name:"discountAmount",
  id:uuid(),
  type:"number",
  placeholder:"Enter Discount Amount",
}
,{
    name:"productId",
    id:uuid(),
    type:"number",
    placeholder:"Product ID",
},
{
    name:"startDate",
    id:uuid(),
    type:"date",
    placeholder:"Start Date",
},
{
    name:"endDate",
    id:uuid(),
    type:"date",
    placeholder:"End Date",
}

]


export const FormBillingDetails: FormBillingDetails[] = [
    {
        name:"FirstName",
        label:"FirstName",
        type:"text",
        validation:{
            required:true,
            minLength:5,
        }
    },
    {
        name:"LastName",
        label:"LastName",
        type:"text",
        validation:{
            required:true,
            minLength:5,
        }
    },
    {
        name:"StreetAddress",
        label:"StreetAddress",
        type:"text",
        validation:{
            required:true,
            minLength:10,
        }
    },
    {
        name:"City",
        label:"City",
        type:"text",
        validation:{
            required:true,
            minLength:5,
        }
    },
    {
        name:"Country",
        label:"Country",
        type:"text",
        validation:{
            required:true,
            minLength:5,
        }
    },
    {
        name:"PostalCode",
        label:"PostalCode",
        type:"text",
        validation:{
            required:true,
            minLength:5,
        }
    },
    {
        name:"PhoneNumber",
        label:"PhoneNumber",
        type:"text",
        validation:{
            required:true,
            minLength:11,
        }
    },
    {
        name:"email",
        label:"email",
        type:"email",
        validation:{
            pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            required:true,
            minLength:7,
        }
    },
]
export default RENDERER_INPUTS;


