import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import sizeService from './services/sizeService'
import UpdateSize from './UpdateSize';
import { useTranslation } from 'react-i18next';

export default function SizesTable({reRender}) {

    const [rows, setRows] = React.useState([])
    const { t } = useTranslation();

    React.useEffect(() => {
        sizeService.getSizes().then(response => {
            setRows(response.data)
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
            <TableCell align="right">{t("Size")}</TableCell>
            <TableCell align="right">{t("Update")}</TableCell>
            <TableCell align="right">{t("Delete")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <OneSize key={row.id} row={row}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const OneSize = ({row}) => {

    const [newRow, setNewRow] = React.useState(row)

    const [deleted, setDeleted] = React.useState(false)
    const { t } = useTranslation();

    const deletedSizeHandler = (id) => {
        sizeService.deleteSize(id).then(response => {
            // console.log(response)
            if(response.status == 204){
                setDeleted(true)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    if(!deleted){
        return (
            <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {newRow.id}
                  </TableCell>
                  <TableCell align="right">{newRow.name}</TableCell>
                  <TableCell align="right">
                    <UpdateSize row={row} updateBrandF={(val) => {setNewRow(val)}}/>
                  </TableCell>
                  <TableCell align="right">
                  <Button
                                className=""
                                variant="contained"
                                color="error"
                                onClick={() => { deletedSizeHandler(newRow.id) }}
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