import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import sizeService from './services/sizeService';
import { useTranslation } from 'react-i18next';
import SelectAutoWidth from '../tasks/SelectAutoWidth';

export default function UpdateSize({row, updateBrandF}) {

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState(row.name)
  const [product_type, setProduct_type] = React.useState(row.product_type)
  const { t } = useTranslation();

  const handleClickOpen = () => {
    
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeTitleHandler = () => {
    sizeService.updateSize(row.id, {
      name: title,
      product_type: product_type
    }).then(response => {
      updateBrandF(response.data)
      handleClose()
    }).catch(error => {
      console.log(error)
    })
  }

  React.useEffect(() => {
    if(open){
      sizeService.getOneSize(row.id).then(response => {
        console.log(response.data)
        setTitle(response.data.name)
        setProduct_type(response.data.product_type)
      }).catch(error => {
        console.log(error)
      })
    }
  }, [open])

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
          {t("Brand ni o'zgartirish")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"sx={{p:1}}>
            <SelectAutoWidth getProductType={val => {setProduct_type(val)}} defaultVal={product_type}/>
            <TextField
                required
                label="Brand name"
                autoFocus
                id="name"
                variant="outlined"
                fullWidth
                value={title}
                sx={{mt: 3}}
                onChange={(event) => {setTitle(event.target.value)}}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("Asil holida qoldirish")}</Button>
          <Button onClick={changeTitleHandler} autoFocus>
            {t("O'zgartirish")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}