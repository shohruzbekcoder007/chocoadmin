import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Paper } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import brandService from '../services/brandService'
import UpdateBrand from '../UpdateBrand';

export default function BrandList({reRender}) {

    const [brands, setBrands] = useState([])

    useEffect(() => {
        brandService.getBrands().then(response => {
            console.log("response.data")
            setBrands(response.data)
        }).catch(error => {
            console.log(error)
        })
    },[reRender])

  return (
    <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="large" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Brand Id</TableCell>
                        <TableCell align="center">Brand Name</TableCell>
                        <TableCell align="center">Update</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        brands.map(elem => <DataTableItem key={elem} elem={elem}/>)
                    }
                </TableBody>
            </Table>
        </TableContainer>
  )
}

const DataTableItem = ({elem}) => {

    const [deleted, setDeleted] = useState(false)
    const handleDeleted = (id) => {
        brandService.deleteBrand(id).then(response => {
            if(response.status){
                setDeleted(prev => !prev)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    if(!deleted){
        return (
            <TableRow>
                <TableCell align="left">{elem.id}</TableCell>
                <TableCell align="center">{elem.title}</TableCell>
                <TableCell align="center">
                    <UpdateBrand id={elem.id}/>
                </TableCell>
                <TableCell align="right">
                <Button
                            className=""
                            variant="contained"
                            color="error"
                            onClick={() => { handleDeleted(elem.id) }}
                            startIcon={<FuseSvgIcon className="text-48" size={24} color="white">material-twotone:delete_outline</FuseSvgIcon>}
                        >
                            Delete
                        </Button>
                </TableCell>
            </TableRow>
        )
    }else{
        return null;
    }
}