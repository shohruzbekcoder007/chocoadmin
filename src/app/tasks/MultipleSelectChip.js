import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import taskService from './services/taskService'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({getSizes, product_type}) {

  const theme = useTheme()
  const [personName, setPersonName] = React.useState([])
  const [allNames, setAllNames] = React.useState([])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
    getSizes(typeof value === 'string' ? value.split(',') : value)
  }

  React.useEffect(() => {
    if(product_type){
      taskService.getSizes(product_type).then(response => {
        setAllNames(response.data)
      }).catch(error => {
        console.log(error)
      })
    }
  }, [product_type])

  return (
      <FormControl className="mt-8 mb-8 w-full">
        <InputLabel id="demo-multiple-chip-label">Size</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => {
                return (
                <Chip key={value.id} label={value.name} />
              )})}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {allNames.map((name) => (
            <MenuItem
              key={name.id}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
}