export interface IProp{
    imgSrc:string,
    description:string,
    price:number,
}


export interface ISettings{
    dots:boolean,
    infinite:boolean,
    speed:number,
    slidesToShow:number,
    slidesToScroll:number
  }

  export interface IStatuess{
      statusCode?: string,
      msg:string
  }

 export interface IFormInput {
    name: string;
    id:string;
    label:string;
    type: string;
  }

  export interface IOrganization {
    Vendor:string;
    combanyName:string;
    contactName:string;
    brand:string;
  }

  export interface IProductInformations{
    productName:string;
    SKU:string;
    unitInStock:number;
    Discription:string;
  }


  export interface IPrice {
    priceValue:number;
    discount:number ;
    startDate:string;
    endDate:string ; 
    isOpen?:boolean;
  }

  export interface IRegister{
    name: "username" | "email" | "password" | "confirmPassword";
    plassholder: string;
    type: string;
    validation:{
      pattern?:RegExp;
      required:boolean,
      minLength:number
    }
  }

  export interface ILogin {
    name: "email" | "password";
    label:string;
    plassholder: string;
    type: string;
    validation:{
      pattern?:RegExp;
      required:boolean,
      minLength:number
    }
  }
  export interface IProduct {
    brand:string,
    category:string,
    discontinued:boolean,
    productId:number,
    productName:string,
    rating:number,
    supplier:string,
    unitPrice:number,
    unitsInStock:number
  }

  export interface Products {
    id: number;
    productId: number;
    productName: string;
    unitPrice: number;
    discount: number;
    rate: number;
    imageUrl: string | undefined;
  }
  
  export interface IPropductErrors{
    productName: string;
    Discription: string;
    SKU: string;
    brands: string;
    unitInStock: string;
    priceValue: string;
    discount: string;
    startDate: string;
    endDate: string;
    Vendor: string;
    contactName: string;
    combanyName: string;
    productCode:string;
    propertyNames: string;
    propertyValues: string;
    filePaths: string;
    tags: string;
    
  }


  export interface IUpdateProductInputData{
    name: string;
    type:string;
    id?: string;
    label?:string;
    placeholder:string;
  }

  export interface ISearchValue {
    productName:string;
    productId:number | null;
    imageUrl:string;
    discount:number;
    unitPrice:number;
}

export interface IDiscount {
  discountId:number;
  discountAmount:number;
  startDate:string;
  endDate:string;
  productId:number;
  product:string 
}

export interface IAddDiscountInput{
  name:string;
  id:string;
  type:string;
  placeholder:string
}



