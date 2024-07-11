import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

export default function Category() {
  const [category, setCategory] = useState<string>('');
  console.log(category)
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  return (
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
  );
}