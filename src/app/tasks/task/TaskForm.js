import Button from '@mui/material/Button'
import NavLinkAdapter from '@fuse/core/NavLinkAdapter'
import { useEffect, useMemo, useState } from 'react'
import FuseLoading from '@fuse/core/FuseLoading'
import _ from '@lodash'
import Box from '@mui/system/Box'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import IconButton from '@mui/material/IconButton'
import { FormControlLabel, FormGroup, Paper, Switch, TextField, Typography } from '@mui/material'
import MultipleSelectChip from '../MultipleSelectChip'
import Editor from '../Editor'
import SelectAutoWidth from '../SelectAutoWidth'
import SelectCategory from '../SelectCategory'
import SelectStatus from '../SelectStatus'
import SelectAdvertisement from '../SelectAdvertisement'
import SelectBanner from '../SelectBanner'
import taskService from '../services/taskService'
import AditionalInformation from '../AditionalInformation'
import BrandList from '../BrandList'
import SaleList from '../SaleList'
import AddBookTypes from '../AddBookTypes'
import SelectYozuv from '../SelectYozuv'
import { useTranslation } from 'react-i18next'

function TaskForm() {

  const { t } = useTranslation();

  const [product_type, setProduct_type] = useState(null)
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [status, setStatus] = useState("NEW")
  const [size, setSize] = useState([])
  const [has_size, setHasSize] = useState(false)
  const [is_active, setIsActive] = useState(false)
  const [description, setDescription] = useState('')
  const [descriptionRu, setDescriptionRu] = useState('')
  const [advertisement, setAdvertisement] = useState('')
  const [banner, setBanner] = useState('')
  const [percentage, setPercentage] = useState('')
  const [availability, setAvailability] = useState('')
  const [banner_discount, setBanner_discount] = useState('')
  const [brand, setBrand] = useState('')
  const [additions, setAdditions] = useState([])
  const [loading, setLoading] = useState(false)
  const [yozuv, setYozuv] = useState("krill")
  const [titleRu, setTitleRu] = useState('')

  const list_id = useMemo(() => {
    return additions.map(elem => {
      return elem.color_id
    })
  }, [additions])


  function onSubmitNew() {
    setLoading(true)
    let jsondata = {
      product_type,
      title_uz: title,
      title_ru: titleRu,
      category: [category],
      status,
      yozuv,
      has_size,
      is_active,
      description_uz: description,
      description_ru: descriptionRu,
      advertisement,
      banner,
      percentage,
      availability,
      banner_discount,
      brand
    }

    var form_data = new FormData();

    for ( var key in jsondata ) {
      form_data.append(key, jsondata[key]);
    }

    for(let i = 0; i < additions.length; i++){
      for(let j = 0; j < additions[i].files.length; j++){
        form_data.append(additions[i].color_id, additions[i].files[j])
      }
    }

    for(let i = 0; i < additions.length; i++){
      form_data.append(`price_${additions[i].color_id}`, additions[i].price)
    }

    size.forEach((item) => form_data.append("size", (+item)))
    list_id.forEach((item) => form_data.append("list_id", (+item)))

    taskService.createProduct(form_data).then(response => {
      console.log(response)
      setLoading(false)
    }).catch(error => {
      console.log(error)
      setLoading(false)
    })
  }

  return (
    <>
      {(!loading)?
        <Paper sx={{m: 2}}>
        <div className="relative flex flex-col flex-auto items-center px-24 sm:px-48">
          <div className="flex items-center justify-between border-b-1 w-full  mt-16 mb-32">
            <h3>{t("Add Product")}</h3>
            <div className="flex items-center">
              <IconButton className="" component={NavLinkAdapter} to="/tasks" size="large">
                <FuseSvgIcon>heroicons-outline:x</FuseSvgIcon>
              </IconButton>
            </div>
          </div>
  
          <div className="w-full">
            <SelectAutoWidth getProductType={(val) => {setProduct_type(val)}}/>
            <div className="grid w-full grid-cols-1 gap-y-48 sm:grid-cols-2 mt-8 mb-8">
              <div style={{marginRight: "10px"}}>
                <TextField
                  className="mt-8 mb-8"
                  required
                  label={t("Mahsulot nomi(uz)")}
                  autoFocus
                  id="name"
                  variant="outlined"
                  fullWidth
                  value={title}
                  onChange={(event) => {setTitle(event.target.value)}}
                />
              </div>
              <div style={{marginLeft: "10px"}}>
                <TextField
                  className="mt-8 mb-8"
                  required
                  label={t("Mahsulot nomi(ru)")}
                  autoFocus
                  id="name"
                  variant="outlined"
                  fullWidth
                  value={titleRu}
                  onChange={(event) => {setTitleRu(event.target.value)}}
                />
              </div>
            </div>
              <Typography variant="body2" gutterBottom>
                {t("Description uz")}
              </Typography>
            <Editor getDescription={val => {setDescription(val)}}/>
              <Typography variant="body2" gutterBottom>
                {t("Description ru")}
              </Typography>
            <Editor getDescription={val => {setDescriptionRu(val)}}/>
            {
              (product_type != "book")?
              <MultipleSelectChip
                product_type={product_type}
                getSizes={(val) => {
                  setSize(val.map(elem => {
                    return elem.id
                  }))
                }}
              />:
              <></>
            }
            <SelectCategory categorySelectF={(val) => {console.log(val); setCategory(val)}} product_type={product_type}/>
            <SelectStatus getStatusValue={(val) => {setStatus(val)}}/>
            {
              (product_type == "book")?<SelectYozuv getStatusValue={(val) => {setYozuv(val)}}/>:null
            }
            
            <SelectAdvertisement getAdvertisementValue={(val) => {setAdvertisement(val)}}/>
            <BrandList getAdvertisementValue={(val) => {setBrand(val)}} product_type={product_type}/>
            <SelectBanner getBannerValue={val => setBanner(val)}/>
            <TextField
              className="mt-8 mb-8"
              // required
              label={t("Foyiz")}
              autoFocus
              id="name"
              variant="outlined"
              fullWidth
              value={percentage}
              type='number'
              onChange={(event) => {setPercentage(event.target.value)}}
            />
            <TextField
              className="mt-8 mb-8"
              // required
              label={t("Availability")}
              autoFocus
              id="name"
              variant="outlined"
              fullWidth
              value={availability}
              type='number'
              onChange={(event) => {setAvailability(event.target.value)}}
            />
            <SaleList getAdvertisementValue={val => { setBanner_discount(val) }}/>
            <FormGroup>
              <FormControlLabel control={<Switch onChange={event => {setHasSize(event.target.checked)}}/>} label={t("has_size")} />
              <FormControlLabel required control={<Switch onChange={event => {setIsActive(event.target.checked)}}/>} label={t("is_active")} />
            </FormGroup>
          </div>
  
          <div className="flex items-center justify-between border-b-1 w-full  mt-16 mb-16">
            <span className="mt-8 mb-8">{t("Aditional information")}</span>
          </div>
            {product_type != "book"?<AditionalInformation getImages={val => {setAdditions(val)}}/>:<AddBookTypes getImages={val => {setAdditions(val)}}/>}
        </div>
        {(
          <Box
            className="flex items-center mt-40 py-14 pr-16 pl-4 sm:pr-48 sm:pl-36 border-t"
          >
            <span className="ml-auto"></span>
            <Button
              className="ml-8"
              variant="contained"
              color="secondary"
              disabled={false}
              onClick={onSubmitNew}
            >
              {t("Create")}
            </Button>
          </Box>
        )}
      </Paper>:<FuseLoading/>
      }
    </>
    
  );
}

export default TaskForm;