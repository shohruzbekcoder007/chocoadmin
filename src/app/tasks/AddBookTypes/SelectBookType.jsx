import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import muqova from "../../../dictionary/muqova"

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

export default function SelectBookType({getTypes}) {

  const theme = useTheme()
  const [personName, setPersonName] = React.useState([])
  const allNames = React.useMemo(() => {
    return muqova.map(elem => {
        return {
            name: elem.uz,
            value: elem.value
        }
    })
  }, [])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
    getTypes(typeof value === 'string' ? value.split(',') : value)
  }

  return (
      <FormControl className="mt-8 mb-16 w-full">
        <InputLabel id="demo-multiple-chip-label">Book Types</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Book Types" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value, index) => {
                return (
                <Chip key={index} label={value.name} />
              )})}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {allNames.map((name, index) => (
            <MenuItem
              key={index}
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