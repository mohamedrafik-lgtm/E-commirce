import { Switch } from '@headlessui/react'
import clsx from 'clsx'
import { ChangeEvent, Fragment, useState } from 'react'
import InputComponent from '../components/ui/InputComponent'

export const Pricing = () => {
    const [price, setPrice] = useState({
        priceValue:'',
        discount:0,
        endDate: '',
    })
    console.log(price)
    // handlers
    const handlerPriceChange = (event:ChangeEvent<HTMLInputElement>) => {
       const {value,name} = event.target
       setPrice({
        ...price,
         [name]: value
       })
    }
    const [enabled, setEnabled] = useState<boolean>(false)
    
    function getTodayDate(): { day: number, month: number, year: number } {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1; // Months are zero-based in JavaScript
        const year = today.getFullYear();
    
        return {
            day: day,
            month: month,
            year: year
        };
    }
    
    // Usage example
    const todayDate = getTodayDate();
    console.log(todayDate)
    return (
        <div className="border rounded-md shadow-md">
            <div className="flex p-5 border-b  content-center">
                <h4 className="font-bold">Pricing</h4>
                <br />
            </div>
            <div className="p-5 space-y-3">
               <div className="flex flex-col space-y-2 ">
                  <label htmlFor="price">price</label>
                  <InputComponent value={price.priceValue} onChange={handlerPriceChange} className="border rounded-md w-full p-2 h-11  transition focus:shadow-xl focus:outline-double focus:outline-none " placeholder="0.00" type="text" id="priceValue" name="priceValue"/>
               </div>
               <div className="flex place-content-between">
                   <p>discount?</p>
                   <Switch checked={enabled} onChange={setEnabled} as={Fragment}>
                       {({ checked, disabled }) => (
                           <button
                           className={clsx(
                           'group inline-flex h-6 w-11 items-center rounded-full',
                            checked ? 'bg-blue-600' : 'bg-gray-200',
                            disabled && 'cursor-not-allowed opacity-50'
                        )}>
                                <span className="sr-only">Enable notifications</span>
                                <span
                                className={clsx('size-4 rounded-full bg-white transition', checked ? 'translate-x-6' : 'translate-x-1')}/>
                            </button>)}
                   </Switch>
               </div>
               {enabled ? <div className="flex flex-col space-y-6">
                <div>
                <label htmlFor="discount">value</label>
                <InputComponent value={price.discount} onChange={handlerPriceChange} className="border rounded-md w-full p-2 h-11  transition focus:shadow-xl focus:outline-double focus:outline-none " placeholder="0.00" type="number" id="discount" name="discount"/>
                </div>
                 <div className="flex items-center place-content-between">
                    <label htmlFor="end-date">end date</label>
                    <InputComponent value={price.endDate} onChange={handlerPriceChange} className="border rounded-md p-2 transition focus:shadow-xl focus:outline-double focus:outline-none" type="date"  min={`${todayDate.year}-${todayDate.month}-${todayDate.day}`.toString()} name="end-date" id="end-date" />
                 </div>
               </div>:null}
            </div>
        </div>
    )
}