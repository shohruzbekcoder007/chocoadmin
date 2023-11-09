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
// import categoryBrand from './../services/brandService';
import advertisementService from './services/advertisementService'
import { useTranslation } from 'react-i18next';
import SelectAutoWidth from 'src/app/tasks/SelectAutoWidth';
import { MuiFileInput } from 'mui-file-input';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function UpdateAdvertisement({ setCreatedOption, id }) {

    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [titleRu, setTitleRu] = React.useState('');
    const [description, setDescription] = React.useState('')
    const [descriptionRu, setDescriptionRu] = React.useState('')
    const [value, setValue] = React.useState(null);
    const [value1, setValue1] = React.useState(null);
    const { t } = useTranslation();

    const handleChange = (newValue) => {
        setValue(newValue)
    }

    const handleChange1 = (newValue) => {
        setValue1(newValue)
    }

    const handleClickOpen = () => {
        // setTitle("")
        // setTitleRu("")
        // setDescription('')
        // setDescriptionRu('')
        // setValue(null)
        // setValue1(null)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        if(open){
            advertisementService.getOneAdvertisement(id).then(response => {
                console.log(response.data)
                setTitle(response.data.title_uz)
                setTitleRu(response.data.title_ru)
                setDescription(response.data.description_uz)
                setDescriptionRu(response.data.description_ru)
            }).catch(error => {
                console.log(error)
            })
        }
    }, [open, id])

    const newCreateCategory = () => {
        let formData = new FormData();
        formData.append("icon", value);
        formData.append("title_uz", title);
        formData.append("title_ru", titleRu);
        formData.append("description_uz", description);
        formData.append("description_ru", descriptionRu);
        formData.append("banner_image", value1);
        advertisementService.createAdvertisement(formData).then(response => {
            if(response.data.id){
                handleClose()
                setCreatedOption({
                    alertMessage: "Categoriya created",
                    type: "success"
                })
            }
        }).catch(error => {
            handleClose()
            let message = " "
            Object.keys(error.response.data).forEach(elem => {
                message = message + `${elem}: ` + error.response.data[elem] + "\n "
            })
            setCreatedOption({
                alertMessage: `did not create Categoriy \n ${message}`,
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
                // color="secondary"
                onClick={handleClickOpen}
                // startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
            >
                {t("Edit")}
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2, minWidth: '400px' }} id="customized-dialog-title">
                    {t("Advertisement")}
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
                    {/* <SelectAutoWidth getProductType={val => {setProduct_type(val)}} defaultVal={product_type}/> */}
                    <MuiFileInput value={value} sx={{width: "100%", mb: 2}} onChange={handleChange} placeholder='iconc'/>
                    <TextField
                        className="mt-8 mb-16"
                        required
                        label={t("Title(uz)")}
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
                        label={t("Title(ru)")}
                        // autoFocus
                        id="name"
                        variant="outlined"
                        fullWidth
                        value={titleRu}
                        onChange={(event) => {setTitleRu(event.target.value)}}
                    />
                    <TextField
                        className="mt-8 mb-16"
                        required
                        label={t("Description (uz)")}
                        // autoFocus
                        id="name"
                        variant="outlined"
                        fullWidth
                        value={description}
                        onChange={(event) => {setDescription(event.target.value)}}
                    />
                    <TextField
                        className="mt-8 mb-16"
                        required
                        label={t("Description (ru)")}
                        // autoFocus
                        id="name"
                        variant="outlined"
                        fullWidth
                        value={descriptionRu}
                        onChange={(event) => {setDescriptionRu(event.target.value)}}
                    />
                    <MuiFileInput value={value1} sx={{width: "100%", mt: 2}} onChange={handleChange1} placeholder='banner_image'/>
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