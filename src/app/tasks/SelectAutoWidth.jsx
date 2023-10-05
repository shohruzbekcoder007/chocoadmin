import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import product_type from "../../dictionary/product_type"

export default function SelectAutoWidth() {

    const productList = React.useMemo(() => {
        return product_type.map(ptype => {
            return {
                value: ptype.value,
                name: ptype.uz
            }
        })
    }, [])


  const [age, setAge] = React.useState(product_type[0].value);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="mt-8 mb-8">
      <FormControl sx={{width: "100%"}}>
        <InputLabel id="demo-simple-select-autowidth-label">Product type</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={age}
          onChange={handleChange}
          fullWidth
          label="Product type"
        >
            {
                productList.map(pty => {
                    return <MenuItem value={pty.value}>{pty.name}</MenuItem>
                })
            }
        </Select>
      </FormControl>
    </div>
  );
}