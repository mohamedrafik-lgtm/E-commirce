import { InputHTMLAttributes } from "react"

interface IProp extends InputHTMLAttributes<HTMLInputElement>{}

const InputComponent = ({className,...rest}:IProp) => {
    return (
            <input className={`${className}`} {...rest}/>
    )

}

export default InputComponent