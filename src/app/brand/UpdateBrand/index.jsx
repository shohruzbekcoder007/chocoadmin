import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import brandService from '../services/brandService'
import { useTranslation } from 'react-i18next';
import SelectAutoWidth from 'src/app/tasks/SelectAutoWidth';

export default function UpdateBrand({id, updateBrandF}) {

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('')
  const [titleRu, setTitleRu] = React.useState('')
  const [product_type, setProduct_type] = React.useState('')
  const { t } = useTranslation();

  const handleClickOpen = () => {
    brandService.getOneBrand(id).then(response => {
      setTitle(response.data.title_uz)
      setTitleRu(response.data.title_ru)
      setProduct_type(response.data.product_type)
    }).catch(error => {
      console.log(error)
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeTitleHandler = () => {
    brandService.updateBrand(id, {
      title_uz: title,
      title_ru: titleRu
    }).then(response => {
      updateBrandF(response.data)
      handleClose()
    }).catch(error => {
      console.log(error)
      handleClose()
    })
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        {t("Edit")}
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
            <SelectAutoWidth getProductType={val => {setProduct_type(val)}} defaultVal={product_type}/>
            <TextField
                required
                label="Brand name(uz)"
                autoFocus
                id="name"
                variant="outlined"
                fullWidth
                value={title}
                sx={{mb:2}}
                onChange={(event) => {setTitle(event.target.value)}}
            />
            <TextField
                required
                label="Brand name(ru)"
                autoFocus
                id="name"
                variant="outlined"
                fullWidth
                value={titleRu}
                onChange={(event) => {setTitleRu(event.target.value)}}
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