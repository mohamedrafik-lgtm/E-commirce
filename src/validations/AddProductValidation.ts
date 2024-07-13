import { IProductInformations } from "../interface";


export const AddProductValidation = (product:IProductInformations) => {
    const errors:IProductInformations = {
        productName:"",
        Discription:"",
        SKU:"",
        unitInStock:0
    }

    if (!product.productName.trim() || product.productName.length < 8 || product.productName.length > 80) {
        errors.productName = "product name should be between 5 and 30 characters";
    }
    return errors;
}