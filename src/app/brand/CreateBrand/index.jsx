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
import { TextField } from '@mui/material';
import categoryBrand from './../services/brandService';
import { useTranslation } from 'react-i18next';
import SelectAutoWidth from 'src/app/tasks/SelectAutoWidth';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function CreateBrand({setCreatedOption}) {

    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [titleRu, setTitleRu] = React.useState('');
    const [product_type, setProduct_type] = React.useState('book')
    const { t } = useTranslation();

    const handleClickOpen = () => {
        setTitle("")
        setTitleRu("")
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const newCreateCategory = () => {
        let formData = new FormData();
        formData.append("title_uz", title);
        formData.append("title_ru", titleRu);
        formData.append('product_type', product_type)
        categoryBrand.createBrand(formData).then(response => {
            if(response.data.id){
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
            console.log(error)
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
                {t("Add")}
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2, minWidth: '400px' }} id="customized-dialog-title">
                    {t("Brand")}
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
                    <SelectAutoWidth getProductType={val => {setProduct_type(val)}} defaultVal={product_type}/>
                    <TextField
                        className="mt-8 mb-16"
                        required
                        label={t("Category name(uz)")}
                        // autoFocus
                        id="name"
                        variant="outlined"
                        fullWidth
                        value={title}
                        onChange={(event) => {setTitle(event.target.value)}}
                    />
                    <TextField
                        className="mt-8 mb-16"
                        required
                        label={t("Category name(ru)")}
                        // autoFocus
                        id="name"
                        variant="outlined"
                        fullWidth
                        value={titleRu}
                        onChange={(event) => {setTitleRu(event.target.value)}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button 
                        // autoFocus 
                        onClick={newCreateCategory}
                    >
                        {t("Save")}
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}