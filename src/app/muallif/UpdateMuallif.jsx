import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TextField } from '@mui/material';
import muallifService from './services/muallifService'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateMuallif({author_id, setRow}) {

  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState('')

  React.useEffect(() => {
    if(open)
        muallifService.getOneMuallif(author_id).then(response => {
            setName(response.data.name)
        }).catch(error => {
            console.log(error)
        })
  }, [open])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateAuthorFunction = () => {
    muallifService.updateMuallif(author_id, {
        name: name
    }).then(response => {
        setRow(response.data)
    }).catch(error => {
        console.log(error)
    })
    handleClose()
  }

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
        <DialogTitle>{"Update Muallif"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField value={name} onChange={event => {setName(event.target.value)}} label="Muallif nomi" variant="outlined" sx={{my: 3, minWidth: "320px"}}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={updateAuthorFunction}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}