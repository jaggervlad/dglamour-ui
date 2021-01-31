import React from 'react';
import useTable from '../table/useTable';
import { Grid, Paper, TableBody, TableCell, TableRow } from '@material-ui/core';
import OrderPdfButton from './OrderPdfButton';
import OrderSeeButton from './OrderSeeButton';

const headCells = [
  { id: 'noPed', label: 'Nº Ped', disableSorting: true },
  { id: 'cliente', label: 'Cliente', disableSorting: true },
  { id: 'direccion', label: 'Dirección', disableSorting: true },
  { id: 'total', label: 'Total', disableSorting: true },
  { id: 'estado', label: 'Estado', disableSorting: true },
  { id: 'acciones', label: 'Acciones', disableSorting: true },
];
export default function DispatchedOrdersTable({ orders, filterFn }) {
  const {
    TblContainer,
    TblHead,
    TblPagination,
    EmptyRows,
    recordsAfterPagination,
  } = useTable(orders, headCells, filterFn);

  const TblBody = (props) => (
    <TableBody>
      {recordsAfterPagination().map((item) => (
        <TableRow key={item.id}>
          <TableCell>{item.id.slice(5, 10)}</TableCell>
          <TableCell align="center">{item.cliente.nombre}</TableCell>
          <TableCell align="center">{item.direccion}</TableCell>
          <TableCell align="center">S/ {item.total.toFixed(2)}</TableCell>
          <TableCell align="center">{item.estado}</TableCell>

          <TableCell align="center">
            <Grid container justify="center" spacing={2}>
              <Grid item>
                <OrderPdfButton id={item.id} />
              </Grid>

              <Grid item>
                <OrderSeeButton id={item.id} />
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
