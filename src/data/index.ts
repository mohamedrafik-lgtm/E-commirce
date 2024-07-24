import { ILogin, IRegister } from "../interface";


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

export default RENDERER_INPUTS;