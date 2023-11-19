import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import SelectCategory from './SelectCategory';
import BrandList from './BrandList';
import SelectAutoWidth2 from './SelectAutoWidth2';
import { useTranslation } from 'react-i18next';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SearchProduct({setSearchText}) {

  const [open, setOpen] = React.useState(false);
  const [product_type, setProduct_type] = useState(null)
  const [title, setTitle] = useState("")
  const [brand, setBrand] = useState(null)
  const [category, setCategory] = useState(null)
  const [price_min, setPrice_min] = useState(null)
  const [price_max, setPrice_max] = useState(null)
  const [search, setSearch] = useState("")

  const { t } = useTranslation();

  const createSearchText = () => {
    let searchText = ``
    if(product_type){
      searchText = searchText +`&product_type=${product_type}`
    }
    if(title){
      searchText = searchText +`&title=${title}`
    }
    if(brand){
      searchText = searchText +`&brand=${brand}`
    }
    if(category){
      searchText = searchText +`&category=${category}`
    }
    if(price_min){
      searchText = searchText +`&price_min=${price_min}`
    }
    if(price_max){
      searchText = searchText +`&price_max=${price_max}`
    }
    if(search){
      searchText = searchText +`&search=${search}`
    }
    return searchText;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const searchHendler = (_) => {
    const searchText = createSearchText()
    setSearchText(searchText)
    handleClose()
  }

  const clearSearchHandler = (_) => {

    setProduct_type(null)
    setTitle("")
    setBrand(null)
    setCategory(null)
    setPrice_min(null)
    setPrice_max(null)
    setSearch("")

    setSearchText('')
    handleClose()

  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        {t("Izlash")}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{t("Izlash parametrlari")}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField id="outlined-basic" label="Search text" value={search} onChange={event => {setSearch(event.target.value)}} variant="outlined" fullWidth sx={{mt: 2}}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField id="outlined-basic" label="Maxsulot nomi" value={title} onChange={event => {setTitle(event.target.value)}} variant="outlined" fullWidth sx={{mt: 2}}/>
                </Grid>
                <Grid item xs={12}>
                  <SelectAutoWidth2 getProductType={(val) => { setProduct_type(val) }} />
                </Grid>
                <Grid item xs={6}>
                  <TextField id="outlined-basic" label="price_min" value={price_min} onChange={event => {setPrice_min(event.target.value)}} variant="outlined" fullWidth type='number'/>
                </Grid>
                <Grid item xs={6}>
                  <TextField id="outlined-basic" label="price_max" value={price_max} onChange={event => {setPrice_max(event.target.value)}} variant="outlined" fullWidth type='number'/>
                </Grid>
                <Grid item xs={12}>
                  <SelectCategory 
                    categorySelectF={(val) => { setCategory(val) }}
                    product_type={product_type}
                  />
                </Grid>
                <Grid item xs={12}>
                  <BrandList 
                    getAdvertisementValue={(val) => { setBrand(val) }} 
                    product_type={product_type} 
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={clearSearchHandler}>{t("Tozalash")}</Button>
          <Button onClick={searchHendler}>{t("Izlash")}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}