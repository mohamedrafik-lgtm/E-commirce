import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';

const  ShippingMethodMaltyChooses = () => {

    const [checked, setChecked] = useState(true);

    const handleChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
      setChecked(event.target.checked);
    };
    return (
        <div className='border p-4 w-fit'> 
            <div>
              <h3 className="text-xl font-semibold">Choose the shipping method that suits you</h3>
            </div>

            <form>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4 items-center">
                        <label htmlFor="standard">Standard</label>
                        <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </div>
                    <div className="flex gap-4 items-center">
                        <label htmlFor="express">Express</label>
                        <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </div>
                    <div className="flex gap-4 items-center">
                        <label htmlFor="overnight">Overnight</label>
                        <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ShippingMethodMaltyChooses