import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon'
import { FormControlLabel, Switch, TextField } from '@mui/material'
import { MuiFileInput } from 'mui-file-input'
import BasicDatePicker from './BasicDatePicker'
import salesService from './services/salesService'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateSales({setCreatedOption}) {

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(null)
  const [deadline, setDeadline] = React.useState(null)
  const [title, setTitle] = React.useState("")
  const [isActive, setIsActive] = React.useState(false)

  const handleChange = (newValue) => {
    setValue(newValue)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createSalesF = () => {
    let form_data = new FormData();
    form_data.append('title', title);
    form_data.append('deadline', deadline);
    form_data.append('image', value);
    form_data.append('is_active', isActive);
    salesService.createSales(form_data).then(response => {
      console.log(response.status)
      handleClose()
      setCreatedOption({
        alertMessage: "Banner Discount created",
        type: "success"
    })
    }).catch(error => {
      console.log(error)
      handleClose()
      setCreatedOption({
        alertMessage: "did not create Banner Discount",
        type: "error"
    })
    })
  }

  return (
    <div>
      <Button
            className=""
            variant="contained"
            color="secondary"
            onClick={handleClickOpen}
            startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
        >
            Add
        </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Create Banner Discount</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField 
              sx={{mt: 2, mb: 1, width: "100%"}}
              id="outlined-basic11"
              label="Title" 
              variant="outlined"
              value={title}
              onChange={event => {setTitle(event.target.value)}}
            />
            <MuiFileInput value={value} onChange={handleChange} sx={{width: "100%", mt: 1, mb: 1}} placeholder='file'/>
            <BasicDatePicker setFunction={val => {setDeadline(val)}}/>
            <FormControlLabel sx={{ mt: 1, mb: 1 }} control={<Switch onChange={event => {setIsActive(event.target.checked)}}/>} label="active" />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={createSalesF}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}