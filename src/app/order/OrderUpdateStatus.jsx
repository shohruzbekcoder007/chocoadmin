import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/material';
import SelectStatusOrder from './SelectStatusOrder';
import orderService from './services/orderService'

export default function OrderUpdateStatus({ orderId, order_items, status, reRender }) {
    const [open, setOpen] = React.useState(false);
    const [newStatus, setNewStatus] = React.useState(status)

    const updateStatus = () => {
        orderService.updateOrder(orderId, {status: newStatus}).then(response => {
            console.log(response)
            if(response.status === 200){
                reRender(prev => {
                    return !prev
                })
            }
        }).catch(error => {
            console.log(error)
        })
        handleClose()
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const sum = React.useMemo(() => {
        return order_items.reduce((partialSum, elem) => partialSum + (elem.quantity * elem.product_price_uzs), 0);
    },[])

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Buyurtmani ko'rish
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Buyurtma Nomer-{orderId}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                            <TableHead sx={{ borderBottom: "2px solid #000" }}>
                                <TableRow>
                                    <TableCell>Maxsulot nomi</TableCell>
                                    <TableCell align="right">Variant name</TableCell>
                                    <TableCell align="right">Miqdori</TableCell>
                                    <TableCell align="right">Narxi</TableCell>
                                    <TableCell align="right">Jami narxi</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    order_items.map((elem, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{elem.product_name}</TableCell>
                                                <TableCell align="right">{elem.variant_name}</TableCell>
                                                <TableCell align="right">{elem.quantity}</TableCell>
                                                <TableCell align="right">{elem.product_price_uzs}</TableCell>
                                                <TableCell align="right">{elem.quantity * elem.product_price_uzs}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                        <Stack
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                            spacing={{ xs: 1, sm: 2, md: 4, mt: 2, mb: 2 }}
                        >
                            <p>Jami: {sum} so'm</p>
                        </Stack>
                        <Stack
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                            spacing={{ xs: 1, sm: 2, md: 4, mt: 4, mb: 2 }}
                        >
                            <SelectStatusOrder getSelectValue={val => {setNewStatus(val)}} defStatus={status}/>
                        </Stack>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Qaytish</Button>
                    <Button onClick={updateStatus} autoFocus>
                        O'zgartirishlarni saqlash
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}