import * as yup from "yup"
import { IPropductErrors } from "../interface"

export const registerSchema = yup
  .object({
    username: yup.string().required("username is required!").min(5,"username should be at least 5 characters"),
    email: yup.string().required("email is required!").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Not a valid email address"),
    password: yup.string().required("password is required!").min(8,"password should be at least 8 characters long"),
    confirmPassword: yup.string().required("confirm password is required!")
  })
  .required()

  export const loginSchema = yup
  .object({
    email: yup.string().required("email is required!").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Not a valid email address"),
    password: yup.string().required("password is required!").min(8,"password should be at least 8 characters long"),
  })
  .required()
  interface IProduct{
    productName:string,
    Discription:string,
    SKU:string,
    unitInStock:number,
    priceValue:number,
    discount:number,
    startDate:string,
    endDate:string,
    Vendor:string,
    contactName:string,
    combanyName:string,
    brand:string,
    productCode:string,
    tags:string[],
    filePaths:string[],
    propertyNames:string[],
    propertyValues:string[],
  }
  
 export const AddProductValidation =({productName,Discription,SKU,unitInStock,priceValue
  ,discount,startDate,endDate,Vendor,contactName,combanyName,productCode,propertyNames,
  propertyValues,filePaths,tags,brand}:IProduct)=>{
  
  const productErrors:IPropductErrors = {
    productName: '',
    Discription: '',
    SKU: '',
    brands:'',
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
    
  }


  if(!productName.trim() || productName.length < 7 || productName.length > 80){
    productErrors.productName = "Product Name must be at least 7 characters long and at least 80 characters long" 
  }
  if(!Discription.trim() || Discription.length < 20 || Discription.length > 500){
    productErrors.Discription = "Discription should be at least 20 characters long and not empty"
  }
  if(!SKU.trim() || SKU.length < 5 || SKU.length > 30){
    productErrors.SKU = "SKU should be at least 5 characters long and not empty"
  }
  if(unitInStock < 1){
    productErrors.unitInStock = "Unit in Stock should be a positive number"
  } 
  if(priceValue < 1){
    productErrors.priceValue = "Price Value should be a positive number"
  }
  if(discount < 1 || discount === priceValue){
    productErrors.discount = "Discount should be a positive number and less than price value"
  }
  if(!startDate){
    productErrors.startDate = "Start Date should be selected"
  }
  if(!endDate){
    productErrors.endDate = "End Date should be selected"
  }
  if(!Vendor.trim() || Vendor.length < 5 || Vendor.length > 50){
    productErrors.Vendor = "Vendor Name should be at least 5 characters long and not empty"
  }
  if(!contactName.trim() || contactName.length < 5 || contactName.length > 50){
    productErrors.contactName = "Contact Name should be at least 5 characters long and not empty"
  }
  if(!combanyName.trim() || combanyName.length < 5 || combanyName.length > 50){
    productErrors.combanyName = "Company Name should be at least 5 characters long and not empty"
  }
  if(!productCode.trim() || productCode.length < 5 || productCode.length > 30){
    productErrors.productCode = "Product Code should be at least 5 characters long and not empty"
  }
  if(propertyNames.length < 5 || propertyNames.length > 20){
    productErrors.propertyNames = "At least 5 properties must be added."
  }
  
  if(propertyValues.length < 5 || propertyValues.length > 20){
    productErrors.propertyValues = "At least 5 properties must be added."
  }
  if(tags.length < 5 || tags.length > 200){
    productErrors.tags = "Tags should be at least 5 characters long and not more than 200 characters"
  }

if(filePaths.length < 1 ){
  productErrors.filePaths = "Product images must be added."
}
  if(!brand.trim() || brand.length < 5 || brand.length > 50){
    productErrors.brands = "Brand Name should be at least 5 characters long and not empty"
  }



  return productErrors
 }