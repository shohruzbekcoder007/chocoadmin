import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import taskService from './services/taskService'

export default function SelectAdvertisement({getAdvertisementValue}) {

    const [productList, setProductList] = React.useState([])

    React.useEffect(() => {
        taskService.getAdvertisement().then(response => {
            const new_list = response.data.map(elem => {
                return {
                    value: elem.id,
                    name: elem.title
                }
            })
            setProductList(new_list);
        }).catch(error => {
            console.log(error)
            setProductList([])
        })
    }, [])


  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value)
    getAdvertisementValue(event.target.value)
  };

  return (
    <div className="mt-16 mb-8">
      <FormControl sx={{width: "100%"}}>
        <InputLabel id="demo-simple-select-autowidth-label">Advertisement</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={age}
          onChange={handleChange}
          fullWidth
          label="Advertisement"
        >
            {
                productList?.map((pty, index) => {
                    return <MenuItem key={index} value={pty.value}>{pty.name}</MenuItem>
                })
            }
        </Select>
      </FormControl>
    </div>
  );
}