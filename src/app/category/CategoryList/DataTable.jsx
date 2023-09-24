import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import categoryService from '../services';

export default function DataTable() {

    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        categoryService.getCategory().then(resone => {
            setCategoryList(resone.data)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="large" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Category Id</TableCell>
                        <TableCell align="right">Categoty name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categoryList.map(elem => {
                            return (
                                <TableRow
                                    key={elem.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {elem.id}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="right">
                                        {elem.title}
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}