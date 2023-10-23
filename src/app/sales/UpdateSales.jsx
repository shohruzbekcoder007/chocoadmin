import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { FormControlLabel, Switch, TextField } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import BasicDatePicker from './BasicDatePicker';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateSales({row}) {
    
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(null)
    const [deadline, setDeadline] = React.useState(row.deadline)
    const [title, setTitle] = React.useState(row.title)
    const [isActive, setIsActive] = React.useState(row.is_active)
  
    const handleChange = (newValue) => {
      setValue(newValue)
    }
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Upadate Banner Discount"}</DialogTitle>
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
            <FormControlLabel sx={{ mt: 1, mb: 1 }} control={<Switch onChange={event => {setIsActive(event.target.checked)}} defaultChecked={isActive}/>} label="active" />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}