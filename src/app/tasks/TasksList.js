import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import taskService from './services/taskService'
import FullScreenDialog from './FullScreenDialog'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import PriceUpdate from './PriceUpdate'

const columns = [
  { id: 'id', label: 'id' },
  { id: 'title_uz', label: 'title_uz' },
  { id: 'title_ru', label: 'title_ru' },
  { id: 'status', label: 'status' },
  { id: 'product_type', label: 'product_type' },
  { id: 'price_uzs', label: 'price_uzs' },
  { id: 'discount_uzs', label: 'discount_uzs' },
  { id: 'update_price', label: 'update_price' },
  { id: 'update', label: 'update' },
  { id: 'deleteF', label: 'deleteF' },
];

function createData(id, title_uz, title_ru, status, price_uzs, discount_uzs, product_type, update, deleteF, update_price) {
  return { id, title_uz, title_ru, status, price_uzs, discount_uzs, product_type, update, deleteF, update_price };
}

export default function TasksList({ searchText }) {

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState(1)
  const [books, setBooks] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const [deleted, setDeleted] = React.useState(false)
  const { t } = useTranslation();

  React.useEffect(() => {
    const url_query = `?page_size=${rowsPerPage}&page=${page}${searchText}`
    taskService.getProducts(url_query).then(response => {
      setPage(response.data.page)
      setCount(response.data.count)
      const bookList = response.data.results.map(({ id, title_uz, title_ru, status, price_uzs, discount_uzs, product_type, update, deleteF, update_price }) => {
        return createData(id, title_uz, title_ru, status, price_uzs, discount_uzs, product_type,
          <FullScreenDialog productId={id} />,
          <Button
            className=""
            variant="contained"
            color="error"
            onClick={() => { deletedProductHandler(id) }}
            startIcon={<FuseSvgIcon className="text-48" size={24} color="white">material-twotone:delete_outline</FuseSvgIcon>}
          >
            {t("Delete")}
          </Button>,
          // <p>{t("Price")}</p>
          <PriceUpdate productId={id} name={{title_uz, title_ru}}/>
        )
      })
      setBooks(bookList)
    }).catch(error => {
      console.log(error)
    })
  }, [rowsPerPage, page, deleted, searchText])


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  const oneProductClickHandler = (row) => {
    setOpen(true)
  }

  const deletedProductHandler = (id) => {
    taskService.deleteProduct(id).then(response => {
      setDeleted(!deleted)
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', m: 2 }}>
      <TableContainer sx={{ maxHeight: 560 }}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((row, index) => {
              return (
                <TableRow hover key={index} role="checkbox" tabIndex={1} onClick={() => { oneProductClickHandler(row) }}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
