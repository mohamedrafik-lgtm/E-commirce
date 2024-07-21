import { forwardRef, InputHTMLAttributes, Ref } from "react"

interface IProp extends InputHTMLAttributes<HTMLInputElement>{}

const InputComponent = forwardRef(({className,...rest}:IProp,ref:Ref<HTMLInputElement>) => {
    return (
            <input
            ref={ref}
            className={`${className}`} {...rest}/>
    )

})

export default InputComponent