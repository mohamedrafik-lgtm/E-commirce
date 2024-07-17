import { IPrice, IProductInformations } from "../interface";


export const ProductInformationValidation = (product:IProductInformations) => {
    const errors:{productName:string,Discription:string,SKU:string ,unitInStock:string} = {
        productName:"",
        Discription:"",
        SKU:"",
        unitInStock:"",
    }

    if (!product.productName.trim() || product.productName.length < 8 || product.productName.length > 30) {
        errors.productName = "product name should be between 8 and 30 characters";
    }
    if (!product.Discription.trim() || product.Discription.length < 10 || product.Discription.length > 80){
        errors.Discription = "Description should be between 10 and 80 characters";
    }
    if (!product.SKU.trim() || product.SKU.length < 10 || product.SKU.length > 30){
        errors.SKU = "SKU should be between 10 and 30 characters";
    }
    if (isNaN(product.unitInStock) || product.unitInStock < 1 || product.unitInStock > 1000){
        errors.unitInStock = "unit in stock should be a number between 1 and 1000";
    }
    
    return errors;
}



export const PriceValidations = ({priceValue,discount,endDate,isOpen}:IPrice) =>{
    
    const PriceError:{priceValue:string,discount:string,endDate:string} = {
        priceValue:"",
        discount:"",
        endDate:"",
    }
    if (isNaN(priceValue) || priceValue < 1){
        PriceError.priceValue = "Price value should be a number between 1 ";
    }
     console.log(isOpen)
    if(isOpen){
        if( isNaN(discount) || discount < 1 ){
            PriceError.discount = "Discount should be a number between 0";
        }
        if(endDate?.length < 1){
            PriceError.endDate = "End date is required when enabled";
        }
    }
    
    return PriceError
}