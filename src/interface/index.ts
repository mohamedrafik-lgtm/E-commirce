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
      statusCode: string,
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