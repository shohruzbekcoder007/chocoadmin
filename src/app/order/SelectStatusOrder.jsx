import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectStatusOrder({getSelectValue, defStatus}) {
  const [age, setAge] = React.useState(defStatus);

  const handleChange = (event) => {
    getSelectValue(event.target.value)
    setAge(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Status</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        label="Status"
        onChange={handleChange}
      >
        <MenuItem value={"New"}>New</MenuItem>
        <MenuItem value={"Completed"}>Completed</MenuItem>
        <MenuItem value={"Canceled"}>Canceled</MenuItem>
      </Select>
    </FormControl>
  );
}