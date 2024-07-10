import { ChangeEvent, useState } from "react"
import InputComponent from "./ui/InputComponent"
import { IOrganization } from "../interface"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const Organization = () => {
    const [organization,setOrganization] = useState<IOrganization>({
      Vendor:'',
      contactName: '',
      combanyName:'',
      category: '',
      brand: '',
      Tags:'',
    })
    const [category, setCategory] = useState<string>('');

    console.log(category)
   //  handlers
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
   console.log(organization)
    const handelChange = (event:ChangeEvent<HTMLInputElement>) =>{
        const {value,name} = event.target
        console.log(value)
        setOrganization({
         ...organization,
         [name]: value
        })
    }
    return (
        <div className="border rounded-md shadow-md ">
            <div className="flex p-5 border-b  content-center">
                <h4 className="font-bold">Organization</h4>
                <br />
            </div>
            <div className="p-5 space-y-5">
               <div className="flex flex-col space-y-2 ">
                  <label htmlFor="Vendor">Vendor</label>
                  <InputComponent value={organization.Vendor} onChange={handelChange} className="border rounded-md w-full p-2 h-11  transition focus:shadow-xl focus:outline-double focus:outline-none " placeholder="eg.Nike" type="text" id="Vendor" name="Vendor"/>
               </div>
               <div className="flex flex-col space-y-2 ">
                  <label htmlFor="combanyName">combany name</label>
                  <InputComponent value={organization.combanyName} onChange={handelChange} className="border rounded-md w-full p-2 h-11  transition focus:shadow-xl focus:outline-double focus:outline-none " placeholder="combany name" type="text" id="combanyName" name="combanyName"/>
               </div>
               <div className="flex flex-col space-y-2 ">
                  <label htmlFor="contactName">contact name</label>
                  <InputComponent value={organization.contactName} onChange={handelChange} className="border rounded-md w-full p-2 h-11  transition focus:shadow-xl focus:outline-double focus:outline-none " placeholder="contact Name" type="text" id="contactName" name="contactName"/>
               </div>
               <div>
                   <Box sx={{ minWidth: 120 }}>
                     <FormControl fullWidth>
                       <InputLabel id="demo-simple-select-label">Category</InputLabel>
                       <Select
                         labelId="demo-simple-select-label"
                         id="demo-simple-select"
                         value={category}
                         label="Category"
                         onChange={handleChange}
                       >
                         <MenuItem value={`nvidia`}>nvidia</MenuItem>
                         <MenuItem value={`AMD`}>AMD</MenuItem>
                         <MenuItem value={`intel`}>intel</MenuItem>
                       </Select>
                     </FormControl>
                  </Box>
               </div>
               <div className="flex flex-col space-y-2 ">
                  <label htmlFor="Tags">Tags</label>
                  <InputComponent value={organization.Tags} onChange={handelChange} className="border rounded-md w-full p-2 h-11  transition focus:shadow-xl focus:outline-double focus:outline-none " placeholder="Enter tags here" type="text" id="Tags" name="Tags"/>
               </div>
               <div className="flex flex-col space-y-2 ">
                  <label htmlFor="brand">brand</label>
                  <InputComponent value={organization.brand} onChange={handelChange} className="border rounded-md w-full p-2 h-11  transition focus:shadow-xl focus:outline-double focus:outline-none " placeholder="brand tags here" type="text" id="brand" name="brand"/>
               </div>
            </div>
        </div>
    )
}

export default Organization