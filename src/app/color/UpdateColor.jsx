import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
// import brandService from '../services/brandService'
import colorService from './services/colorService'
import SketchColor from './SketchColor';

export default function UpdateColor({id, updateBrandF}) {

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('')

  const handleClickOpen = () => {
    colorService.getOneColor(id).then(response => {
    //   setTitle(response.data.title)
      console.log(response.data)
    }).catch(error => {
      console.log(error)
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeTitleHandler = () => {
    // brandService.updateBrand(id, {
    //   title,
    // }).then(response => {
    //   updateBrandF(response.data)
    //   handleClose()
    // }).catch(error => {
    //   console.log(error)
    //   handleClose()
    // })
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Brand ni o'zgartirish"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
                required
                className="mt-8 mb-16"
                label="Brand name"
                autoFocus
                id="name"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(event) => {setTitle(event.target.value)}}
            />
            <SketchColor getColor={color => {console.log(color)}} startColor="#ccc"/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Asil holida qoldirish</Button>
          <Button onClick={changeTitleHandler} autoFocus>
            O'zgartirish
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}