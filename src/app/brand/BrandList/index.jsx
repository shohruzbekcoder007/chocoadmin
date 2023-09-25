import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Paper } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';

export default function BrandList() {
  return (
    <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="large" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Brand Id</TableCell>
                        <TableCell align="center">Brand Name</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        [1,2,3,4,5,6].map(elem => <DataTableItem key={elem} elem={elem}/>)
                    }
                </TableBody>
            </Table>
        </TableContainer>
  )
}

const DataTableItem = ({elem}) => {
    return (
        <TableRow>
            <TableCell align="left">Brand Id</TableCell>
            <TableCell align="center">Brand Name</TableCell>
            <TableCell align="right">
            <Button
                        className=""
                        variant="contained"
                        color="error"
                        // onClick={() => { handleDeleted(elem.id) }}
                        startIcon={<FuseSvgIcon className="text-48" size={24} color="white">material-twotone:delete_outline</FuseSvgIcon>}
                    >
                        Delete
                    </Button>
            </TableCell>
        </TableRow>
    )
}