import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import categoryService from '../services';
import { Box, Button } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

export default function DataTable({reRender}) {

    const [categoryList, setCategoryList] = useState([])
    const [deleted, setdeleted] = useState(false)

    const handleDeleted = (id) => {
        console.log(id)
    }

    useEffect(() => {
        categoryService.getCategory().then(resone => {
            setCategoryList(resone.data)
        }).catch(error => {
            console.log(error)
        })
    }, [reRender])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="large" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Sup category</TableCell>
                        <TableCell>Category Id</TableCell>
                        <TableCell align="center">Categoty name</TableCell>
                        <TableCell align="center">Iconc</TableCell>
                        <TableCell align="center">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categoryList.map(elem => <DataTableItem key={elem.id} elem={elem}/>)
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}


const DataTableItem = ({elem}) => {
    
    const [subCategoryOpen, setSubCategoryOpen] = useState(false)

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell align="left">
                <Box sx={{
                    display: 'inline-block',
                    cursor: 'pointer'
                }}>
                    {
                     subCategoryOpen?<FuseSvgIcon className="text-48" size={48} color="action">material-outline:arrow_drop_up</FuseSvgIcon>
                    :<FuseSvgIcon className="text-48" size={48} color="action">material-outline:arrow_drop_down</FuseSvgIcon>
                    }
                </Box>
            </TableCell>
            <TableCell component="th" scope="row">
                {elem.id}
            </TableCell>
            <TableCell component="th" scope="row" align="center">
                {elem.title}
            </TableCell>
            <TableCell component="th" scope="row" align="center">
            <Box
                    sx={{
                        width: '60px',
                        height: '60px',
                        display: 'inline-block',
                        '& img': {
                            width: "100%",
                            height: "100%"
                        }
                    }}
                >
                    <img src={elem.icon} alt="" />
                </Box>
                
            </TableCell>
            <TableCell align="center">
            <Button
                className=""
                variant="contained"
                color="error"
                onClick={() => {handleDeleted(elem.id)}}
                startIcon={<FuseSvgIcon className="text-48" size={24} color="white">material-twotone:delete_outline</FuseSvgIcon>}
            >
                Delete
            </Button>
            </TableCell>
        </TableRow>
    )
}