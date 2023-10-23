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
import { useNavigate } from 'react-router-dom'
import FullScreenDialog from './FullScreenDialog'

const columns = [
  { id: 'id', label: 'id' },
  { id: 'title_uz', label: 'title_uz' },
  { id: 'title_ru', label: 'title_ru' },
  { id: 'status', label: 'status' },
  { id: 'product_type', label: 'product_type'},
  { id: 'price_uzs', label: 'price_uzs' },
  { id: 'discount_uzs', label: 'discount_uzs' },
  { id: 'update', label: 'update' },
];

function createData(id, title_uz, title_ru, status, price_uzs, discount_uzs, product_type, update) {
  return { id, title_uz, title_ru, status, price_uzs, discount_uzs, product_type, update };
}

export default function TasksList() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState(1)
  const [books, setBooks] = React.useState([])
  const [open, setOpen] = React.useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const oneProductClickHandler = (row) => {
    // console.log(row)
    setOpen(true)
  }

  React.useEffect(() => {
    const url_query = `?page_size=${rowsPerPage}&page=${page}`
    taskService.getProducts(url_query).then(response => {
        setPage(response.data.page)
        setCount(response.data.count)
        const bookList = response.data.results.map(({id, title_uz, title_ru, status, price_uzs, discount_uzs, product_type, update}) => {
            return createData(id, title_uz, title_ru, status, price_uzs, discount_uzs, product_type, <FullScreenDialog productId={id}/>)
        })
        setBooks(bookList)
    }).catch(error => {
        console.log(error)
    })
  },[rowsPerPage, page])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', m: 4 }}>
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
                  {column.label}
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
