import {  SetStateAction, useState } from "react"
import InputComponent from "./InputComponent"


const SelectFile = () => {
    const [file, setFile] = useState()

    function handleChange(event: { target: { files: SetStateAction<undefined>[] } }):{
      setFile(event.target.files[0])
    }

    return (
        <div>
            <InputComponent type="file" onChange={handleChange}/>
        </div>
    )
}

export default SelectFile