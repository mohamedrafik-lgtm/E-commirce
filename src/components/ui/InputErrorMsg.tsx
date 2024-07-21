interface IProp{
    msg?: string
}

const InputErrorMsg = ({msg}: IProp) => {

    return msg ? <span className="block text-red-700 font-semibold text-sm">{msg}</span> : null
}


export default InputErrorMsg;