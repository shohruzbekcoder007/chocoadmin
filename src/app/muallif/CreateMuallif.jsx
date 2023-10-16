import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import { TextField } from '@mui/material';
import muallifService from './services/muallifService'

export default function CreateMuallif({setCreatedOption}) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createAuthor = () => {
    let formData = new FormData();
        formData.append("name", name);
        muallifService.createMuallif(formData).then(response => {
            if(response.data.id){
                setCreatedOption({
                    alertMessage: "Author created",
                    type: "success"
                })
                handleClose()
            }
        }).catch(error => {
            setCreatedOption({
                alertMessage: "did not create Author",
                type: "error"
            })
            handleClose()
            console.log(error)
        })
  }

  return (
    <div>
      <Button 
        // onClick={handleClickOpen}
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
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Muallifni yaratish"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField value={name} onChange={event => {setName(event.target.value)}} label="Muallif nomi" variant="outlined" sx={{my: 3, minWidth: "320px"}}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Qaytish</Button>
          <Button onClick={createAuthor} autoFocus>
            Yaratish
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}