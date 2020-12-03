import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useTableStyles } from '../../styles/makeStyles/table';
import { StyledTableCell } from '../table/StyledTableCell';
import PaginationFooter from '../table/PaginationFooter';
import BodyTable from './BodyTable';
import { useMemo, useState } from 'react';
export default function CustomTable(props) {
  const classesTable = useTableStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { rows, search } = props;

  function handleChangePage(e, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(e) {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const filterResults = useMemo(
    () =>
      rows?.filter((row) => {
        return row.nombre.toLowerCase().includes(search.toLowerCase());
      }),
    [search, rows]
  );

  return (
    <TableContainer component={Paper} className={classesTable.container}>
      <Table
        stickyHeader
        className={classesTable.table}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Nombre</StyledTableCell>
            <StyledTableCell align="center">Eliminar</StyledTableCell>
            <StyledTableCell align="center">Editar</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? filterResults.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : filterResults
          ).map((row) => (
            <BodyTable key={row.id} categorie={row} />
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>

        <PaginationFooter
          rows={rows}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Table>
    </TableContainer>
  );
}
