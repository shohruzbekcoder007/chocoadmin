import Button from '@mui/material/Button'
import NavLinkAdapter from '@fuse/core/NavLinkAdapter'
import { useEffect, useState } from 'react'
import FuseLoading from '@fuse/core/FuseLoading'
import _ from '@lodash'
import Box from '@mui/system/Box'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import IconButton from '@mui/material/IconButton'
import { FormControlLabel, FormGroup, Paper, Switch, TextField } from '@mui/material'
import MultipleSelectChip from '../MultipleSelectChip'
import Editor from '../Editor'
import SelectAutoWidth from '../SelectAutoWidth'
import SelectCategory from '../SelectCategory'
import SelectStatus from '../SelectStatus'
import SelectAdvertisement from '../SelectAdvertisement'
import SelectBanner from '../SelectBanner'
import taskService from '../services/taskService'
import AditionalInformation from '../AditionalInformation'

function TaskForm() {

  const [product_type, setProduct_type] = useState(null)
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [status, setStatus] = useState("NEW")
  const [size, setSize] = useState([])
  const [hasSize, setHasSize] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [description, setDescription] = useState('')
  const [advertisement, setAdvertisement] = useState('')
  const [brand, setBrand] = useState('')
  const [percentage, setPercentage] = useState('')
  const [availability, setAvailability] = useState('')
  const [banner_discount, setBanner_discount] = useState('')

  useEffect(() => {
   
  }, []);


  function onSubmitNew() {
    taskService.createProduct({
      product_type,
      title,
      category: [category],
      status,
      size,
      hasSize,
      isActive,
      description,
      advertisement,
      brand,
      percentage,
      availability,
      banner_discount
    }).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <Paper sx={{m: 2}}>
      <div className="relative flex flex-col flex-auto items-center px-24 sm:px-48">
        <div className="flex items-center justify-between border-b-1 w-full  mt-16 mb-32">
          <h3>Add Product</h3>
          <div className="flex items-center">
            <IconButton className="" component={NavLinkAdapter} to="/tasks" size="large">
              <FuseSvgIcon>heroicons-outline:x</FuseSvgIcon>
            </IconButton>
          </div>
        </div>

        <div className="w-full">
          <SelectAutoWidth getProductType={(val) => {setProduct_type(val)}}/>
          <TextField
            className="mt-8 mb-8"
            required
            label="Mahsulot nomi"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(event) => {setTitle(event.target.value)}}
          />
          <Editor getDescription={val => {setDescription(val)}}/>
          {
            (product_type != "book")?
            <MultipleSelectChip 
              getSizes={(val) => {
                setSize(val.map(elem => {
                  return elem.id
                }))
              }}
            />:
            <></>
          }
          <SelectCategory categorySelectF={(val) => {console.log(val); setCategory(val)}}/>
          <SelectStatus getStatusValue={(val) => {setStatus(val)}}/>
          <SelectAdvertisement getAdvertisementValue={(val) => {setAdvertisement(val)}}/>
          <SelectBanner getBannerValue={val => setBrand(val)}/>
          <TextField
            className="mt-8 mb-8"
            // required
            label="Foyiz"
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
            label="Availability"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
            value={availability}
            type='number'
            onChange={(event) => {setAvailability(event.target.value)}}
          />
          <TextField
            className="mt-8 mb-8"
            // required
            label="Banner Discount"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
            value={banner_discount}
            type='number'
            onChange={(event) => {setBanner_discount(event.target.value)}}
          />
          <FormGroup>
            <FormControlLabel control={<Switch onChange={event => {setHasSize(event.target.checked)}}/>} label="has_size" />
            <FormControlLabel required control={<Switch onChange={event => {setIsActive(event.target.checked)}}/>} label="is_active" />
          </FormGroup>
        </div>

        <div className="flex items-center justify-between border-b-1 w-full  mt-16 mb-16">
          <span className="mt-8 mb-8">Aditional information</span>
        </div>
          <AditionalInformation/>
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
            Create
          </Button>
        </Box>
      )}
    </Paper>
  );
}

export default TaskForm;