import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Model from './Model';
import { useState } from 'react';
import axiosInstance from '@/config/axios.config';
import { useQueryClient } from 'react-query';
import toast from 'react-hot-toast';


interface IProp{
    productId: number;
}
export default function OptionsModel({productId}:IProp) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [loadingProduct, setLoadingProduct] = useState<number | null>(null);
  const open = Boolean(anchorEl);
    const queryClient = useQueryClient();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteProduct = async (productId: number) => {
        setLoadingProduct(productId);
        try {
          await axiosInstance.delete(`/api/Product/${productId}`);
          queryClient.invalidateQueries('products');
        } catch (error) {
          console.error('Error deleting product:', error);
        } finally {
          setLoadingProduct(null);
        }
      };

    const Archive =async (productId:number)=>{
      setLoadingProduct(productId);
        try {
          await axiosInstance.post(`/api/Product/archive/${productId}`);
          toast.success("The product has been added to the archive.", {
            position: "top-right",
            duration: 1500,
            style: {
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              backdropFilter: 'blur(20px)',
              color: "green",
              width: "fit-content",
            },
          });
        } catch (error) {
          console.error('Error archiving product:', error);
        } finally {
          setLoadingProduct(null);
        }
    }

    const unArchive = async (productId:number)=>{

      setLoadingProduct(productId);
        try {
          await axiosInstance.post(`/api/Product/unarchive/${productId}`);
          toast.success("The product has been restored.", {
            position: "top-right",
            duration: 1500,
            style: {
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              backdropFilter: 'blur(20px)',
              color: "green",
              width: "fit-content",
            },
          });
        } catch (error) {
          console.error('Error unarchiving product:', error);
        } finally {
          setLoadingProduct(null);
        }
    }

  return (
    <div>
      <Button
        id="basic-button"
        style={{
          color:'white',
          backgroundColor:'#3B82F6',
        }}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        options..
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><Model productId={productId}/></MenuItem>

        <MenuItem onClick={handleClose}>
                    <button
                     onClick={()=>Archive(productId)}
                     className="rounded-md border px-2 text-base font-medium py-3 w-full focus:outline-none"
                     style={{
                      borderRadius: '10px'
                     }}>
                       Archive Product
                    </button>
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                    <button
                     onClick={()=>unArchive(productId)}
                     className="rounded-md border px-2 text-base font-medium py-3 w-full focus:outline-none"
                     style={{
                      borderRadius: '10px'
                     }}>
                       Un Archive
                    </button>
                    </MenuItem>



        <MenuItem onClick={handleClose}><button
                       onClick={() => deleteProduct(productId)}
                       style={{
                        borderRadius: '10px'
                       }}
                       className={`px-4 py-2 bg-red-600 text-white hover:bg-red-700 w-full ${loadingProduct === productId ? 'opacity-50 cursor-not-allowed' : ''}`}
                       disabled={loadingProduct === productId}
                    >
                       {loadingProduct === productId? 'Deleting...' : 'Delete'}
                    </button></MenuItem>
                    
      </Menu>
    </div>
  );
}
