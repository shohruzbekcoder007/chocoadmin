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
import { useTranslation } from 'react-i18next';

export default function BrandList({reRender}) {

    const [brands, setBrands] = useState([])
    const { t } = useTranslation();

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
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">{t("Brand Id")}</TableCell>
                        <TableCell align="center">{t("Brand Name(uz)")}</TableCell>
                        <TableCell align="center">{t("Brand Name(ru)")}</TableCell>
                        <TableCell align="center">{t("Update")}</TableCell>
                        <TableCell align="right">{t("Delete")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        brands.map(elem => <DataTableItem key={elem.id} elem={elem}/>)
                    }
                </TableBody>
            </Table>
        </TableContainer>
  )
}

const DataTableItem = ({elem}) => {

    const [brand, setBrand] = useState(elem)
    const [deleted, setDeleted] = useState(false)
    const { t } = useTranslation();
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
                <TableCell align="left">{brand.id}</TableCell>
                <TableCell align="center">{brand.title_uz}</TableCell>
                <TableCell align="center">{brand.title_ru}</TableCell>
                <TableCell align="center">
                    <UpdateBrand id={brand.id} updateBrandF={setBrand}/>
                </TableCell>
                <TableCell align="right">
                <Button
                            className=""
                            variant="contained"
                            color="error"
                            onClick={() => { handleDeleted(brand.id) }}
                            startIcon={<FuseSvgIcon className="text-48" size={24} color="white">material-twotone:delete_outline</FuseSvgIcon>}
                        >
                            {t("Delete")}
                        </Button>
                </TableCell>
            </TableRow>
        )
    }else{
        return null;
    }
}