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
import SelectAutoWidth from '../tasks/SelectAutoWidth';
import variantService from './services/variantService';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const label = { inputProps: { 'aria-label': 'Color switch demo' } };

export default function CreateVariant({setCreatedOption}) {

    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [product_type, set_product_type] = React.useState(null)
    const [duration, setDuration] = React.useState(null)
    const [percent, setPercent] = React.useState(null)
    const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

    const handleClickOpen = () => {
        setName("")
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const newCreateCategory = () => {
        let formData = new FormData();
        formData.append("name", name);
        formData.append("product_type", product_type);
        formData.append("duration", duration);
        formData.append("percent", percent);
        formData.append("is_integration", checked);
        console.log(formData.get('product_type'))
        variantService.createVariant(formData).then(response => {
            if(response.data.id){
                handleClose()
                setCreatedOption({
                    alertMessage: "Variant created",
                    type: "success"
                })
            }
        }).catch(error => {
            handleClose()
            setCreatedOption({
                alertMessage: "did not create Variant",
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
                Add
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2, minWidth: '400px' }} id="customized-dialog-title">
                    Yangi Variant yaratish
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
                        label="Size"
                        autoFocus
                        id="name"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(event) => {setName(event.target.value)}}
                    />
                    <SelectAutoWidth getProductType={val => set_product_type(val)}/>
                    <TextField
                        className="mt-8 mb-16"
                        required
                        label="Size"
                        autoFocus
                        id="name"
                        variant="outlined"
                        fullWidth
                        type='number'
                        value={duration}
                        onChange={(event) => {setDuration(event.target.value)}}
                    />
                    <TextField
                        className="mt-8 mb-16"
                        required
                        label="Size"
                        autoFocus
                        id="name"
                        variant="outlined"
                        fullWidth
                        type='number'
                        value={percent}
                        onChange={(event) => {setPercent(event.target.value)}}
                    />
                    <FormControlLabel
                        control={
                            <Switch 
                                {...label} 
                                defaultChecked
                                checked={checked}
                                onChange={handleChange}
                            />
                        }
                        label="is integration"
                    />
                    
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