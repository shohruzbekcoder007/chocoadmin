import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import orderService from './services/orderService'
import FullScreenDialog from '../tasks/FullScreenDialog'
import OrderUpdateStatus from './OrderUpdateStatus'
import { useTranslation } from 'react-i18next'

const columns = [
  { id: 'id', label: 'id' },
  { id: 'first_name', label: 'first_name' },
  { id: 'last_name', label: 'last_name' },
  { id: 'user_phone_number', label: 'user_phone_number' },
  { id: 'phone_number', label: 'phone_number'},
  { id: 'status', label: 'status' },
  { id: 'look', label: 'look' },
];

function createData(id, first_name, last_name, user_phone_number, status, phone_numberm, look, order_items) {
  return { id, first_name, last_name, user_phone_number, status, phone_numberm, look, order_items };
}

export default function OrderList() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState(1)
  const [books, setBooks] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const [reRender, setReRender] = React.useState(false)
  const { t } = useTranslation();

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

  React.useEffect(() => {

    const url_query = `?page_size=${rowsPerPage}&page=${page}`
    orderService.getOrders(url_query).then(response => {
        setPage(response.data.page)
        setCount(response.data.count)
        const bookList = response.data.results.map(({id, first_name, last_name, user_phone_number, status, phone_number, look, order_items}) => {
            return createData(id, first_name, last_name, user_phone_number, status, phone_number, <OrderUpdateStatus orderId={id} order_items={order_items} status={status} reRender={setReRender}/>)
        })
        setBooks(bookList)
    }).catch(error => {
        console.log(error)
    })

  },[rowsPerPage, page, reRender])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden'}}>
      <TableContainer sx={{ maxHeight: 560 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {t(column.label)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((row, index) => {
                return (
                  <TableRow hover key={index} role="checkbox" tabIndex={1} onClick={() => {oneProductClickHandler(row)}}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(t(value))
                            : (value)}
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
