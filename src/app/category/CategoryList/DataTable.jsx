import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import categoryService from '../services';
import { Alert, Box, Button } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FuseLoading from '@fuse/core/FuseLoading';
import { host } from 'src/utils/API_urls';
import { useTranslation } from 'react-i18next';
import UpdateCategory from '../UpdateCategory';

export default function DataTable({ reRender }) {

    const [categoryList, setCategoryList] = useState([])
    const { t } = useTranslation();

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
                        <TableCell align="left">{t("Sup category")}</TableCell>
                        <TableCell>{t("Category Id")}</TableCell>
                        <TableCell align="center">{t("Categoty name(uz)")}</TableCell>
                        <TableCell align="center">{t("Categoty name(ru)")}</TableCell>
                        <TableCell align="center">{t("Iconc")}</TableCell>
                        <TableCell align="center">{t("Edit")}</TableCell>
                        <TableCell align="center">{t("Delete")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categoryList.map(elem => <DataTableItem key={elem.id} elem={elem} />)
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const DataTableItem = ({ elem }) => {

    const { t } = useTranslation();

    const [subCategoryOpen, setSubCategoryOpen] = useState(false)
    const [oneCategory, setOneCategory] = useState(elem)
    const [deleted, setdeleted] = useState(false)

    const handleDeleted = (id) => {
        categoryService.deleteCategory(id).then(response => {
            console.log(response.status)
            if (response.status == 204) {
                setdeleted(prev => !prev)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <>
            {
                deleted ? null :
                    <>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left">
                                <Box
                                    sx={{
                                        display: 'inline-block',
                                        cursor: 'pointer'
                                    }}
                                    onClick={(_) => { setSubCategoryOpen(prev => !prev) }}
                                >
                                    {
                                        subCategoryOpen ? <FuseSvgIcon className="text-48" size={48} color="action">material-outline:arrow_drop_up</FuseSvgIcon>
                                            : <FuseSvgIcon className="text-48" size={48} color="action">material-outline:arrow_drop_down</FuseSvgIcon>
                                    }
                                </Box>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {oneCategory.id}
                            </TableCell>
                            <TableCell component="th" scope="row" align="center">
                                {oneCategory.title_uz}
                            </TableCell>
                            <TableCell component="th" scope="row" align="center">
                                {oneCategory.title_ru}
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
                                    {oneCategory.icon ? <img src={elem.icon} alt="" /> : null}
                                </Box>

                            </TableCell>
                            <TableCell align="center">
                                <UpdateCategory categoryId={oneCategory.id} updatedCategory={val => {setOneCategory(val)}}/>
                            </TableCell>
                            <TableCell align="center">
                                <Button
                                    className=""
                                    variant="contained"
                                    color="error"
                                    onClick={() => { handleDeleted(oneCategory.id) }}
                                    startIcon={<FuseSvgIcon className="text-48" size={24} color="white">material-twotone:delete_outline</FuseSvgIcon>}
                                >
                                    {t("Delete")}
                                </Button>
                            </TableCell>
                        </TableRow>
                        <ChildCategory subCategoryId={elem.id} subCategoryOpen={subCategoryOpen} />
                    </>
            }
        </>
    )
}

const ChildCategory = ({ subCategoryId, subCategoryOpen }) => {

    const { t } = useTranslation();

    const [subCategories, setSubCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (subCategoryOpen) {
            categoryService.getCategoryChildren(subCategoryId).then(response => {
                setSubCategories(response.data.children)
                setLoading(false)
            }).catch(error => {
                console.log(error)
                setLoading(false)
            })
        }
    }, [subCategoryOpen])

    if (subCategories.length > 0 && subCategoryOpen)
        return (
            <>
                {
                    loading ? <FuseLoading /> : subCategories.map(elem => <SubCategory key={elem.id} elem={elem} />)
                }
            </>

        )
    else
        if (subCategoryOpen)
            if (loading)
                return <TableCell align="center" colSpan={7}><FuseLoading /></TableCell>
            else
                return <TableCell align="center" colSpan={7}>
                    <Alert severity="warning">{t("Sup category mavjud emas")}</Alert>
                </TableCell>;
        else
            return null
}

const SubCategory = ({ elem }) => {

    const { t } = useTranslation();

    const [subCategory, setSubCategory] = useState(elem)
    const [deleted, setdeleted] = useState(false)

    const handleDeleted = (id) => {
        categoryService.deleteCategory(id).then(response => {
            console.log(response.status)
            if (response.status == 204) {
                setdeleted(prev => !prev)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    if (!deleted)
        return (
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="left">

                </TableCell>
                <TableCell component="th" scope="row">
                    {subCategory.id}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                    {subCategory.title_uz}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                    {subCategory.title_ru}
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
                        {subCategory.icon ? <img src={subCategory.icon} alt="" /> : null}
                    </Box>

                </TableCell>
                <TableCell align="center">
                    {/* <Button
                        className=""
                        variant="contained"
                    // color="error"
                    // onClick={() => { handleDeleted(subCategory.id) }}
                    // startIcon={<FuseSvgIcon className="text-48" size={24} color="white">material-twotone:delete_outline</FuseSvgIcon>}
                    >
                        {t("Edit")}
                    </Button> */}
                    <UpdateCategory categoryId={subCategory.id} updatedCategory={val => {setSubCategory(val)}}/>
                </TableCell>
                <TableCell align="center">
                    <Button
                        className=""
                        variant="contained"
                        color="error"
                        onClick={() => { handleDeleted(subCategory.id) }}
                        startIcon={<FuseSvgIcon className="text-48" size={24} color="white">material-twotone:delete_outline</FuseSvgIcon>}
                    >
                        {t("Delete")}
                    </Button>
                </TableCell>
            </TableRow>
        )
    else return null

}