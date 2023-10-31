import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import salesService from './services/salesService'
import { Button, Paper } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { dateFormatter } from 'src/utils/dateFormatter';
import UpdateSales from './UpdateSales';
import { useTranslation } from 'react-i18next';

export default function SaleList({reRender}) {

    const [salesList, setSalesList] = useState([])
    const { t } = useTranslation();

    useEffect(() => {
        salesService.getSales().then(response => {
            setSalesList(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [reRender])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>{t("ID")}</TableCell>
                        <TableCell align="right">{t("Title")}</TableCell>
                        <TableCell align="right">{t("is_active")}</TableCell>
                        <TableCell align="right">{t("deadline")}</TableCell>
                        <TableCell align="right">{t("Update")}</TableCell>
                        <TableCell align="right">{t("Delete")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        salesList.map((elem, index) => {
                            return <OneSale row={elem} key={index} />
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}


const OneSale = ({ row }) => {

    const [deleted, setDeleted] = React.useState(false)
    const { t } = useTranslation();

    const deletedSizeHandler = (id) => {
        salesService.deleteSales(id).then(response => {
            if(response.status == 204){
                setDeleted(true)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    if (!deleted) {
        return (
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">
                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                    {row.is_active?<FuseSvgIcon className="text-48" size={24} color="action">material-outline:credit_score</FuseSvgIcon>:""}
                    </div>
                </TableCell>
                <TableCell align="right">{dateFormatter(row.deadline)}</TableCell>
                <TableCell align="right">
                    <UpdateSales row={row}/>
                </TableCell>
                <TableCell align="right">
                    <Button
                        className=""
                        variant="contained"
                        color="error"
                        onClick={() => { deletedSizeHandler(row.id) }}
                        startIcon={<FuseSvgIcon className="text-48" size={24} color="white">material-twotone:delete_outline</FuseSvgIcon>}
                    >
                        {t("Delete")}
                    </Button>
                </TableCell>
            </TableRow>
        )
    } else {
        return null;
    }
}
