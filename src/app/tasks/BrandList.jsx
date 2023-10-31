import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import taskService from './services/taskService'
import { useTranslation } from 'react-i18next'

export default function BrandList({getAdvertisementValue, product_type, defVal}) {

    const [productList, setProductList] = React.useState([])
    const { t } = useTranslation();

    React.useEffect(() => {
      if(product_type != ""){
        taskService.getBrandList(product_type || "").then(response => {
          const new_list = response.data.map(elem => {
              return {
                  value: elem.id,
                  name: elem.title_uz
              }
          })
          setProductList(new_list);
      }).catch(error => {
          console.log(error)
          setProductList([])
      })
      }
    }, [product_type])


  const [age, setAge] = React.useState(defVal || '');

  const handleChange = (event) => {
    setAge(event.target.value)
    getAdvertisementValue(event.target.value)
  };

  return (
    <div className="mt-16 mb-8">
      <FormControl sx={{width: "100%"}}>
        <InputLabel id="demo-simple-select-autowidth-label">{t("Brand")}</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={age}
          onChange={handleChange}
          fullWidth
          label={t("Brand")}
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