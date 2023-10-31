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
import UpdateMuallif from './UpdateMuallif';
import { useTranslation } from 'react-i18next';

export default function MuallifList({ reRender, setCreatedOption }) {

    const [authors, setAuthors] = useState([])
    const [totalPage, setTotalPage] = useState(1)
    const [page, setPage] = useState(1)
    const { t } = useTranslation();

    const handleChange = (event, value) => {
        setPage(value);
      };

    useEffect(() => {
        muallifService.getMuallif(page).then(response => {
            setAuthors(response.data.results)
            setTotalPage(1)
        }).catch(error => {
            console.log(error)
        })
    },[reRender])

  return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell>{t("ID")}</TableCell>
                    <TableCell align="right">{t("Name")}</TableCell>
                    <TableCell align="right">{t("Update")}</TableCell>
                    <TableCell align="right">{t("Delete")}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    authors.map((elem, index) => {
                        return <OneAuthor row_el={elem} key={index} setCreatedOption={setCreatedOption}/>
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

const OneAuthor = ({row_el, setCreatedOption}) => {

    const [row, setRow] = useState(row_el)
    const { t } = useTranslation();

    const deletedSizeHandler = (id) => {
        muallifService.deleteMuallif(id).then(response => {
            if(response.status == 204){
                console.log(response.status)
                setCreatedOption({
                    alertMessage: "Author deleted",
                    type: "success"
                })
            }
        }).catch(error => {
            console.log(error)
            setCreatedOption({
                alertMessage: "did not delet Author",
                type: "error"
            })
        })
    }

        return (
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">
                   <UpdateMuallif setRow={setRow} author_id={row.id}/>
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
}