import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { DialogContent } from '@mui/material';
import InputComponent from './InputComponent';
import axiosInstance from '@/config/axios.config';
import toast from 'react-hot-toast';


interface ID {
  id: number;
}
interface IDiscount{
    discountAmount:number,
    startDate:string,
    endDate:string,
    productId:number
}
export default function UbdateDiscountModel({id}:ID) {
  const [open, setOpen] = React.useState(false);
  const [discount, setDiscount] = React.useState<IDiscount>({
    discountAmount:0,
    startDate:'',
    endDate:'',
    productId:0
  })

  console.log(discount)
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
// handlers  
   const handelChanged = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target
    setDiscount({
        ...discount,
        [name]:value
    })
   }

  const getdataForUpdate = async ()=>{
    try {
        const {data} = await axiosInstance.get(`/api/Discount/${id}`)
        setDiscount({
            ...data
        })
    } catch (error) {
        console.log(error)
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
    getdataForUpdate()
  };

  const handleClose = () => {
    setOpen(false);
  };


//   requst
   const onSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try {
       const update = await axiosInstance.put(`/api/Discount/${id}`,{
        params:  {
            discountAmount:discount.discountAmount,
            startDate:discount.startDate,
            endDate:discount.endDate,
            productId:discount.productId
        }
        
       }) 
       console.log(update)
    } catch (error) {
        toast.error(`${error}`, {
            position: "top-right",
            duration: 5000,
            style: {
              backgroundColor: "red",
              color: "white",
              width: "fit-content",
            },
          });
    }finally{
        handleClose()
    }
   }
  return (
    <React.Fragment>
      <Button
      style={{
        borderRadius: '0px',
        color:'#FF7F50',
        border: '0px',
      }}
      variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        maxWidth="md"
        fullWidth
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {`Ubdate Discount : ${id}`}
        </DialogTitle>
        <DialogContent>
            <form onSubmit={onSubmit} className='space-y-3'>
                  <div className='flex space-x-2'>
                    <div className='w-full'>
                       <label htmlFor="discountAmount">Discount Amount :</label>
                       <InputComponent onChange={handelChanged} value={discount.discountAmount} type='number' name='discountAmount' id='discountAmount' className='custom-input mb-1 w-full p-2 rounded-md'/>
                    </div>
                    <div className='w-full'>
                        <label htmlFor="productid">Product Id :</label>
                        <InputComponent onChange={handelChanged} value={discount.productId} type='number' name='productId'id='productid' className='custom-input mb-1 w-full p-2 hover:rounded-md'/>
                    </div>
                  </div>
                  <div className='flex space-x-2'>
                    <div className='w-full'>
                       <label htmlFor="startDate">Start Date :</label>
                       <InputComponent onChange={handelChanged} type='date' name='startDate' id='startDate' className='custom-input mb-1 w-full p-2 rounded-md'/>
                    </div>
                    <div className='w-full'>
                       <label htmlFor="endDate">End Date :</label>
                       <InputComponent onChange={handelChanged}  name='endDate' id='endDate' type='date' className='custom-input mb-1 w-full p-2 hover:rounded-md'/>
                    </div>
                  </div>
                  <DialogActions>
                     <button className='text-blue-500 opacity-85 mb-1.5'>
                       Update Discount
                     </button>
                     <Button
                     style={{
                       color:'red'
                     }}
                    type='button'
                      onClick={handleClose} autoFocus>
                       Close
                     </Button>
                </DialogActions>
            </form>
        </DialogContent>
        
      </Dialog>
    </React.Fragment>
  );
}
