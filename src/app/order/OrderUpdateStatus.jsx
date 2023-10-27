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

export default function OrderUpdateStatus({ orderId, order_items }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                        {/* <TableContainer component={Paper}> */}
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
                        {/* </TableContainer> */}
                        <Stack
                            direction="row"
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                        >
                            {/* <Item>Item 1</Item>
                            <Item>Item 2</Item>
                            <Item>Item 3</Item> */}
                        </Stack>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}