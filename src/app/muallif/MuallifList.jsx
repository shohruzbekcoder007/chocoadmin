import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Pagination, Paper } from '@mui/material';
import muallifService from './services/muallifService'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';

export default function MuallifList() {

    const [authors, setAuthors] = useState([])
    const [totalPage, setTotalPage] = useState(1)
    const [page, setPage] = useState(1)

    const handleChange = (event, value) => {
        setPage(value);
      };

    useEffect(() => {
        muallifService.getMuallif(page).then(response => {
            setAuthors(response.data.results)
            console.log(response.data)
            console.log(response.data.page_count)
            setTotalPage(1)
        }).catch(error => {
            console.log(error)
        })
    },[])

  return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Update</TableCell>
                    <TableCell align="right">Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    authors.map((elem, index) => {
                        return <OneAuthor row={elem} key={index} />
                    })
                }
                <TableRow>
                    <TableCell colSpan={4}>
                        <Box sx={{p: 1, display: "flex", justifyContent: "flex-end"}} spacing={2}>
                            <Pagination count={totalPage} onChange={handleChange} />
                        </Box>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
  )
}

const OneAuthor = ({row, renderFunction}) => {
    const [deleted, setDeleted] = React.useState(false)

    // const deletedSizeHandler = (id) => {
    //     colorService.deleteColor(id).then(response => {
    //         if(response.status == 204){
    //             setDeleted(true)
    //         }
    //     }).catch(error => {
    //         console.log(error)
    //     })
    // }

    if (!deleted) {
        return (
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">
                    update
                </TableCell>
                <TableCell align="right">
                    <Button
                        className=""
                        variant="contained"
                        color="error"
                        // onClick={() => { deletedSizeHandler(row.id) }}
                        startIcon={<FuseSvgIcon className="text-48" size={24} color="white">material-twotone:delete_outline</FuseSvgIcon>}
                    >
                        Delete
                    </Button>
                </TableCell>
            </TableRow>
        )
    } else {
        return null;
    }
}