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
import { useTranslation } from 'react-i18next';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

async function getFileFromUrl(url, name, defaultType = 'image/jpeg'){
  const response = await fetch(url);
  const data = await response.blob();
  return new File([data], name, {
    type: data.type || defaultType,
  });
}


export default function UpdateSales({row}) {
  
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(null)
    const [deadline, setDeadline] = React.useState(row.deadline)
    const [title, setTitle] = React.useState(row.title)
    const [isActive, setIsActive] = React.useState(row.is_active)
    const { t } = useTranslation();
  
    const handleChange = (newValue) => {
      setValue(newValue)
    }
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    React.useEffect(() => {
      getFileFromUrl(row.image, "oldingi file").then(response => {
        setValue(response)
      }).catch(error => {
        console.log(error)
      })
    }, [])

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        {t("Edit")}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{t("Upadate Banner Discount")}</DialogTitle>
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
          <Button onClick={handleClose}>{t("Canceled")}</Button>
          <Button onClick={handleClose}>{t("Save")}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}