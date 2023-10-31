import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Paper } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import variantService from './services/variantService'
import { dateFormatter } from 'src/utils/dateFormatter';
import { useTranslation } from 'react-i18next';
// import UpdateBrand from '../UpdateBrand';

export default function VariantList({reRender}) {

    const [brands, setBrands] = useState([])
    const { t } = useTranslation();

    useEffect(() => {
        variantService.getVariants().then(response => {
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
                        <TableCell align="left">{t("Id")}</TableCell>
                        <TableCell align="center">{t("Name")}</TableCell>
                        <TableCell align="center">{t("Created at")}</TableCell>
                        <TableCell align="center">{t("Updated at")}</TableCell>
                        <TableCell align="center">{t("product_type")}</TableCell>
                        <TableCell align="center">{t("duration")}</TableCell>
                        <TableCell align="center">{t("percent")}</TableCell>
                        <TableCell align="center">{t("is_integration")}</TableCell>
                        {/* <TableCell align="center">Updated</TableCell> */}
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

    const { t } = useTranslation();

    const [brand, setBrand] = useState(elem)
    const [deleted, setDeleted] = useState(false)
    const handleDeleted = (id) => {
        variantService.deleteVariant(id).then(response => {
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
                <TableCell align="center">{brand.name}</TableCell>
                <TableCell align="center">{dateFormatter(brand.created_at)}</TableCell>
                <TableCell align="center">{dateFormatter(brand.updated_at)}</TableCell>
                <TableCell align="center">{brand.product_type}</TableCell>
                <TableCell align="center">{brand.duration}</TableCell>
                <TableCell align="center">{brand.percent}</TableCell>
                <TableCell align="center">
                    <div style={{display: "flex", justifyContent: "center"}}>
                        {brand.is_integration?<FuseSvgIcon className="text-48" size={24} color="action">material-outline:credit_score</FuseSvgIcon>:""}
                    </div>
                </TableCell>
                {/* <TableCell align="center">
                    ssa
                    <UpdateBrand id={brand.id} updateBrandF={setBrand}/>
                </TableCell> */}
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