import { NavLink } from "react-router-dom"
import { IStatuess } from "../interface"



const ErrorPage = ({statusCode,msg}:IStatuess) => {


    return (
        <div className="flex flex-col mt-40 space-y-12 items-center">
            <div>
                <h3 className="text-8xl">{statusCode}</h3>
            </div>
            <div>
                <p>{msg}</p>
            </div>
            <div className="items-center bg-red-600 w-64 p-4 rounded-md text-white text-lg text-center">
               <NavLink to={"/"}>Back to home page</NavLink>
            </div>
        </div>
    )
}

export default ErrorPage