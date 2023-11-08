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
import colorService from './services/colorService'
import UpdateColor from './UpdateColor';
import { useTranslation } from 'react-i18next';

export default function ColorList({ reRender }) {

  const [rows, setRows] = React.useState([])
  const { t } = useTranslation();

  React.useEffect(() => {
    colorService.getColors().then(response => {
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
            <TableCell align="right">{t("Title")}</TableCell>
            <TableCell align="right">{t("Color")}</TableCell>
            <TableCell align="right">{t("Update")}</TableCell>
            <TableCell align="right">{t("Delete")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <OneColor key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const OneColor = ({ row }) => {

  const [newRow, setNewRow] = React.useState(row)
  const [deleted, setDeleted] = React.useState(false)
  const { t } = useTranslation();

  const deletedSizeHandler = (id) => {
    colorService.deleteColor(id).then(response => {
      if (response.status == 204) {
        setDeleted(true)
      }
    }).catch(error => {
      console.log(error)
    })
  }

  if (!deleted) {
    return (
      <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {newRow.id}
        </TableCell>
        <TableCell align="right">{newRow.title}</TableCell>
        <TableCell align="right">
          <span
            style={{
              display: "inline-block",
              width: "100px",
              height: "10px",
              backgroundColor: newRow.name,
              border: "1px solid #ccc"
            }}
          ></span>
        </TableCell>
        <TableCell align="right">
          <UpdateColor row={newRow} updateColorF={val => { setNewRow(val) }} />
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