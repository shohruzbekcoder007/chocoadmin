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
import { useTranslation } from 'react-i18next';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function UpdateCategory({ setCreatedOption, categoryId, updatedCategory }) {

    const [category, setCategory] = React.useState(null)
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [titleRu, setTitleRu] = React.useState('');
    const [parent, setParent] = React.useState('');
    const [file, setFile] = React.useState(null);
    const [age, setAge] = React.useState('book');
    const { t } = useTranslation();

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setTitle('')
        setParent('')
        setTitleRu('')
        setFile(null)
        setOpen(false);
    };

    const setFileHandler = (newValue, info) => {
        setFile(newValue)
    }

    React.useEffect(() => {
        if(open){
            // updatedCategory(categoryId)
            categoryService.getCategoryOne(categoryId).then(response => {
                setCategory(response.data)
                setTitle(response.data.title_uz)
                setTitleRu(response.data.title_ru)
                setAge(response.data.product_type)
            }).catch(error => {
                console.log(error)
            })

        }
    }, [open])

    const newCreateCategory = () => {
        let formData = new FormData();
        console.log(file)
        if(file)
            formData.append("icon", file);
        formData.append("title_uz", title);
        formData.append("title_ru", titleRu);
        if(parent)
            formData.append("parent", parent);
        if(age)
            formData.append("product_type", age);
        console.log(formData.get('icon'))
        categoryService.updateCategort(categoryId, formData).then(response => {
            if (response.data.id) {
                handleClose()
                updatedCategory(response.data)
                // setCreatedOption({
                //     alertMessage: "Categoriya updated",
                //     type: "success"
                // })
            }
        }).catch(error => {
            handleClose()
            // setCreatedOption({
            //     alertMessage: "did not update",
            //     type: "error"
            // })
        })
    }

    return (
        <div>
            <Button
                className=""
                variant="contained"
                // color="secondary"
                onClick={handleClickOpen}
                // startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
            >
                {t("Update")}
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {t("Change category information")}
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
                        label={t("Category name(uz)")}
                        // autoFocus
                        id="name"
                        variant="outlined"
                        fullWidth
                        value={titleRu}
                        onChange={(event) => { setTitleRu(event.target.value) }}
                    />
                    <TextField
                        className="mt-8 mb-16"
                        required
                        label={t("Category name(ru)")}
                        // autoFocus
                        id="nameru"
                        variant="outlined"
                        fullWidth
                        value={title}
                        onChange={(event) => { setTitle(event.target.value) }}
                    />
                    {/* <CategorySelectList getSelectedItem={(val) => { setParent(val) }} /> */}
                    <MuiFileInput
                        placeholder={t("Mos rasmni o'zgartirish")}
                        value={file}
                        onChange={setFileHandler}
                        accept="image/*"
                        fullWidth
                    />
                    <FormControl sx={{ minWidth: "100%", mt: 2, mb: 2 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">{t("Product Type")}</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={age}
                            onChange={handleChange}
                            fullWidth
                            label={t("Product Type")}
                        >
                            <MenuItem value={"book"}>Book</MenuItem>
                            <MenuItem value={"clothing"}>Clothing</MenuItem>
                            <MenuItem value={'product'}>Product</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={newCreateCategory}>
                        {t("O'zgartirish")}
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}