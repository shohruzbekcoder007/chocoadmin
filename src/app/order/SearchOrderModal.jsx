import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { minWidth } from '@mui/system';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SearchOrderModal({setSearchText}) {

  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [search, setSearch] = React.useState('')
  const { t } = useTranslation()

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const searchEndClose = () => {
    // console.log(`&status=${status}&phone_number=${phoneNumber}`, status, phoneNumber,search)
    setSearchText(`&status=${status}&phone_number=${phoneNumber}`)
    handleClose()
  }

  const emptyEndClose = () => {
    setStatus('')
    setPhoneNumber('')
    // setSearch('')
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
          <DialogContentText id="alert-dialog-slide-description" sx={{ pt: 2, pb: 2 }}>
            {/* <Box sx={{minWidth: "400px", mb: 1}}>
              <TextField id="outlined-basic" label={t("Search text")} variant="outlined" fullWidth value={search} onChange={(event) => {setSearch(event.target.value)}}/>
            </Box> */}
            <Box sx={{minWidth: "400px", mb: 1}}>
              <TextField id="outlined-basic" label="Phone number" variant="outlined" fullWidth value={phoneNumber} onChange={(event) => {setPhoneNumber(event.target.value)}}/>
            </Box>
            <Box sx={{minWidth: "400px", mb: 1}}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t("status")}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label={t("status")}
                  onChange={handleChange}
                >
                  <MenuItem value={"New"}>{t("New")}</MenuItem>
                  <MenuItem value={"Completed"}>{t("Completed")}</MenuItem>
                  <MenuItem value={"Canceled"}>{t("Canceled")}</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={emptyEndClose}>{t("Back to")}</Button>
          <Button onClick={searchEndClose}>{t("Izlash")}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}