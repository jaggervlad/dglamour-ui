import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import PaginationActions from './PaginationActions';

export default function PaginationFooter(props) {
  const {
    rows,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
  } = props;
  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[10, 15, 25]}
          colSpan={5}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          SelectProps={{
            inputProps: { 'aria-label': 'row per page' },
            native: true,
          }}
          ActionsComponent={PaginationActions}
        />
      </TableRow>
    </TableFooter>
  );
}
