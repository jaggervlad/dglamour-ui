import React from 'react';
import useTable from '../table/useTable';
import { Grid, Paper, TableBody, TableCell, TableRow } from '@material-ui/core';
import ExpenseDeleteButton from './ExpenseDeleteButton';
import ExpenseEditButton from './ExpenseEditButton';

const headCells = [
  { id: 'id', label: 'Nº', disableSorting: true },
  { id: 'proveedor', label: 'Proveedor', disableSorting: true },
  { id: 'concepto', label: 'Concepto Gasto', disableSorting: true },
  { id: 'comprobante', label: 'Nº Boleta', disableSorting: true },
  { id: 'comprobanteDate', label: 'Fecha', disableSorting: true },
  { id: 'importe', label: 'Importe', disableSorting: true },
  { id: 'acciones', label: 'Acciones', disableSorting: true },
];
export default function ExpenseTable({ expenses, filterFn }) {
  const {
    TblContainer,
    TblHead,
    TblPagination,
    EmptyRows,
    recordsAfterPagination,
  } = useTable(expenses, headCells, filterFn);

  const TblBody = (props) => (
    <TableBody>
      {recordsAfterPagination().map((item) => (
        <TableRow key={item.id}>
          <TableCell>{item.id.slice(5, 10)}</TableCell>
          <TableCell align="center">{item.proveedor.nombre}</TableCell>
          <TableCell align="center">{item.concepto.codigo}</TableCell>
          <TableCell align="center">{item.comprobante}</TableCell>
          <TableCell align="center">{item.comprobanteDate}</TableCell>
          <TableCell align="center">${item.importe.toFixed(2)}</TableCell>

          <TableCell align="center">
            <Grid container justify="center" spacing={2}>
              <Grid item>
                <ExpenseDeleteButton id={item.id} />
              </Grid>
              <Grid item>
                <ExpenseEditButton id={item.id} />
              </Grid>
            </Grid>
          </TableCell>
        </TableRow>
      ))}
      <EmptyRows />
    </TableBody>
  );

  return (
    <Paper style={{ width: '100%' }}>
      <TblContainer>
        <TblHead />
        <TblBody />
      </TblContainer>
      <TblPagination />
    </Paper>
  );
}
