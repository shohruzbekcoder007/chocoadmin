import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import { TextField } from '@mui/material';
import Editor from '../tasks/Editor';
import { MuiFileInput } from 'mui-file-input'
import bookService from './services/bookService'
import { useTranslation } from 'react-i18next';

export default function CreateBook({setCreatedOption}) {

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [title, setTitle] = React.useState('');
  const [desc, setdDesc] = React.useState('')
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

  const saveBrand = () => {
    let formData = new FormData();
    formData.append('title', title);
    formData.append('image', value);
    formData.append('desc', desc);
    bookService.createBanner(formData).then(response => {
        setCreatedOption({
            alertMessage: "Categoriya created",
            type: "success"
        })
    }).catch(error => {
        setCreatedOption({
            alertMessage: "did not create Categoriy",
            type: "error"
        })
    })
    handleClose()
  }

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        className=""
        variant="contained"
        color="secondary"
        startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
        >
        {t("Add")}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t("Create a banner")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
                className="mt-8 mb-16"
                required
                label={t("Title")}
                autoFocus
                id="name"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(event) => {setTitle(event.target.value)}}
            />
            <Editor getDescription={val => {setdDesc(val)}}/>
            <MuiFileInput value={value} sx={{width: "100%", mt: 2}} onChange={handleChange} placeholder='file'/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>{t("Asil holida qoldirish")}</Button> */}
          <Button onClick={saveBrand} autoFocus>
            {t("Save")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}