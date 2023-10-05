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

const columns = [
  { id: 'id', label: 'id' },
  { id: 'title', label: 'title' },
  { id: 'status', label: 'status' },
  { id: 'product_type', label: 'product_type'},
  { id: 'price_uzs', label: 'price_uzs' },
  { id: 'discount_uzs', label: 'discount_uzs' },
];

function createData(id, title, status, price_uzs, discount_uzs, product_type) {
  return { id, title, status, price_uzs, discount_uzs, product_type };
}

export default function TasksList() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState(0)
  const [books, setBooks] = React.useState([])

  const navigate = useNavigate()

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const oneProductClickHandler = (row) => {
    navigate(`/tasks/new/section`, {state: {id: row.id}})
  }

  React.useEffect(() => {
    const url_query = `?page_size=${rowsPerPage}&page=${page+1}`
    taskService.getProducts(url_query).then(response => {
        setPage(response.data.page-1)
        setCount(response.data.count)
        const bookList = response.data.results.map(({id, title, status, price_uzs, discount_uzs, product_type}) => {
            return createData(id, title, status, price_uzs, discount_uzs, product_type)
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
            {books.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={() => {oneProductClickHandler(row)}}>
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
