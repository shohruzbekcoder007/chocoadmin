import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import categoryService from '../services';

export default function CategorySelectList({ getSelectedItem }) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
    getSelectedItem(event.target.value)
  };
  const [categoryList, setCategoryList] = React.useState([])

    React.useEffect(() => {
        categoryService.getCategory().then(resone => {
            setCategoryList(resone.data)
        }).catch(error => {
            console.log(error)
        })
    }, [])

  return (
    <Box sx={{ minWidth: "100%", mt: 1, mb: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Parent category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Parent category"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>{""}</em>
          </MenuItem>
          {
            categoryList.map(elem => <MenuItem key={elem.id} value={elem.id}>{elem.title}</MenuItem>)
          }
        </Select>
      </FormControl>
    </Box>
  );
}