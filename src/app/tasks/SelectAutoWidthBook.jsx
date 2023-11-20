import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import taskService from './services/taskService'
import { useTranslation } from 'react-i18next'

export default function SelectAutoWidthBook({getProductType, defVal}) {

    // console.log(defVal, "<-mona")

    const [productList, setProductList] = React.useState([])
    const { t } = useTranslation();

    React.useEffect(() => {
        taskService.getAuthors().then(response => {
            const new_list = response.data.results.map(elem => {
                return {
                    value: elem.id,
                    name: elem.name
                }
            })
            setProductList(new_list);
        }).catch(error => {
            console.log(error)
            setProductList([])
        })
    }, [])


  const [age, setAge] = React.useState(defVal || '');

  const handleChange = (event) => {
    setAge(event.target.value)
    getProductType(event.target.value)
  };

  return (
    <div className="mt-16 mb-8">
      <FormControl sx={{width: "100%"}}>
        <InputLabel id="demo-simple-select-autowidth-label">{t("The author")}</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={age}
          onChange={handleChange}
          fullWidth
          label={t("The author")}
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