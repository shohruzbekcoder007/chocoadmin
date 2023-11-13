import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from 'react-i18next';

export default function SelectStatusOrder({getSelectValue, defStatus}) {
  
  const [age, setAge] = React.useState(defStatus);
  const { t } = useTranslation();

  const handleChange = (event) => {
    getSelectValue(event.target.value)
    setAge(event.target.value)
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">{t("Status")}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        label={("Status")}
        onChange={handleChange}
      >
        <MenuItem value={"New"}>{t("New")}</MenuItem>
        <MenuItem value={"Completed"}>{t("Completed")}</MenuItem>
        <MenuItem value={"Canceled"}>{t("Canceled")}</MenuItem>
      </Select>
    </FormControl>
  );
}