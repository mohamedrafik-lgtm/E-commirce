import { InputHTMLAttributes } from "react"

interface IProp extends InputHTMLAttributes<HTMLInputElement>{}

const InputComponent = ({...rest}:IProp) => {
    return (
            <input className="w-full p-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" {...rest}/>
    )

}

export default InputComponent