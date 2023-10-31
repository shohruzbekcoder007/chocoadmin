import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import product_status from "../../dictionary/product_status"
import { useTranslation } from 'react-i18next';

export default function SelectStatus({getStatusValue, defaultVal}) {

    const productList = React.useMemo(() => {
        return product_status.map(ptype => {
            return {
                value: ptype.value,
                name: ptype.uz
            }
        })
    }, [])


  const [age, setAge] = React.useState(defaultVal || product_status[0].value);
  const { t } = useTranslation();

  const handleChange = (event) => {
    setAge(event.target.value);
    getStatusValue(event.target.value);
  };

  return (
    <div className="mt-8 mb-8">
      <FormControl sx={{width: "100%"}}>
        <InputLabel id="demo-simple-select-autowidth-label">{t("Product type")}</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={age}
          onChange={handleChange}
          fullWidth
          label={t("Product type")}
        >
            {
                productList.map((pty, index) => {
                    return <MenuItem key={index} value={pty.value}>{pty.name}</MenuItem>
                })
            }
        </Select>
      </FormControl>
    </div>
  );
}