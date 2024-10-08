import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import Delete from '@mui/icons-material/Delete';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import axiosInstance from '@/config/axios.config';
import UbdateDiscountModel from './UbdateDiscountModel';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));

interface ID {
  discountId: number;
}
export default function DiscountMenu({discountId}:ID) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete =async () => {
   
    try {
      const res =await  axiosInstance.delete(`/api/Discount/${discountId}`).then((data) => data.status)
      console.log(res);
    } catch (error) {
      console.log(error);
    }
   
  };
  return (
    <div>
      <Button
        style={{
          color:'white',
          backgroundColor:'#3B82F6',
         
        }}
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Options
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem  style={{
          color:'#FF7F50'
        }}  disableRipple>
          <EditIcon style={{
            color:'#FF7F50'
          }}/>
          <UbdateDiscountModel id={discountId}/>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
       
        <MenuItem onClickCapture={handleDelete} style={{
          color:"red"
        }} onClick={handleClose} disableRipple>
          <Delete style={{
            color:'red'
          }}/>
          Delete
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
