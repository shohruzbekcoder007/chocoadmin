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

export default function UpdateBook({ setCreatedOption, banner }) {

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(banner.image);
    const [title, setTitle] = React.useState(banner.title);
    const [desc, setdDesc] = React.useState(banner.desc);
    const [fileChange, setFileChage] = React.useState(false);
    const { t } = useTranslation();

    const handleChange = (newValue) => {
        setValue(newValue)
        setFileChage(true)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateBrand = (id) => {
        let formData = new FormData();
        formData.append('title', title);
        if(fileChange){
            formData.append('image', value);
        }
        formData.append('desc', desc);
        bookService.updateBanner(id, formData).then(response => {
            console.log(response)
            setCreatedOption({
                alertMessage: "Categoriya created",
                type: "success"
            })
        }).catch(error => {
            console.log(error)
            setCreatedOption({
                alertMessage: "did not create Categoriy",
                type: "error"
            })
        })
        handleClose()
    }

    return (
        <div>
            {/* <Button
        onClick={handleClickOpen}
        className=""
        variant="contained"
        color="secondary"
        startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
        >
        Add
      </Button> */}
            <Button
                variant="outlined"
                onClick={handleClickOpen}
            >
                {t("Update")}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {t("Create Banner")}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <TextField
                            className="mt-8 mb-16"
                            required
                            label="Title"
                            autoFocus
                            id="name"
                            variant="outlined"
                            fullWidth
                            value={title}
                            onChange={(event) => { setTitle(event.target.value) }}
                        />
                        <Editor getDescription={val => { setdDesc(val) }} firstText={banner.desc}/>
                        <MuiFileInput value={value} sx={{ width: "100%", mt: 2 }} onChange={handleChange} placeholder='file' />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Qaytish</Button>
                    <Button onClick={() => {updateBrand(banner.id)}} autoFocus>
                        {t("Saqlash")}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}