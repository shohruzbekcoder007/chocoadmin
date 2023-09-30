import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';

export default function UpdateSize({id, updateBrandF}) {

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('')

  const handleClickOpen = () => {
    
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeTitleHandler = () => {
    
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
          <DialogContentText id="alert-dialog-description"sx={{p:1}}>
            <TextField
                required
                label="Brand name"
                autoFocus
                id="name"
                variant="outlined"
                fullWidth
                value={'title'}
                onChange={(event) => {console.log(event.target.value)}}
            />
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