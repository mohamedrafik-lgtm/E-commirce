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