import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import CategorySelectList from '../CategorySelectList';
import categoryService from '../services';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function CreateCategory({ setCreatedOption }) {

    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [parent, setParent] = React.useState('');
    const [file, setFile] = React.useState(null);
    const [age, setAge] = React.useState('book');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setTitle('')
        setParent('')
        setFile(null)
        setOpen(false);
    };

    const setFileHandler = (newValue, info) => {
        setFile(newValue)
    }

    const newCreateCategory = () => {
        let formData = new FormData();
        formData.append("icon", file);
        formData.append("title", title);
        formData.append("parent", parent);
        formData.append("product_type", age);
        categoryService.createCategort(formData).then(response => {
            if (response.data.id) {
                handleClose()
                setCreatedOption({
                    alertMessage: "Categoriya created",
                    type: "success"
                })
            }
        }).catch(error => {
            handleClose()
            setCreatedOption({
                alertMessage: "did not create Categoriy",
                type: "error"
            })
        })
    }

    return (
        <div>
            <Button
                className=""
                variant="contained"
                color="secondary"
                onClick={handleClickOpen}
                startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
            >
                Add
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Yangi Categoriya yaratish
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <TextField
                        className="mt-8 mb-16"
                        required
                        label="Categoriya nomi"
                        autoFocus
                        id="name"
                        variant="outlined"
                        fullWidth
                        value={title}
                        onChange={(event) => { setTitle(event.target.value) }}
                    />
                    <CategorySelectList getSelectedItem={(val) => { setParent(val) }} />
                    <MuiFileInput
                        placeholder="Mos rasm"
                        value={file}
                        onChange={setFileHandler}
                        accept="image/*"
                        fullWidth
                    />
                    <FormControl sx={{ minWidth: "100%", mt: 2, mb: 2 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Product Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={age}
                            onChange={handleChange}
                            fullWidth
                            label="Product Type"
                        >
                            <MenuItem value={"book"}>Book</MenuItem>
                            <MenuItem value={"clothing"}>Clothing</MenuItem>
                            <MenuItem value={'product'}>Product</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={newCreateCategory}>
                        Saqlash
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}