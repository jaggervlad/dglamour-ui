import React from 'react';
import useTable from '../table/useTable';
import { Paper, TableBody, TableRow } from '@material-ui/core';
import OrderPaid from './OrderPaid';

const headCells = [
  { id: 'noPed', label: 'Nº Ped', disableSorting: true },
  { id: 'cliente', label: 'Cliente', disableSorting: true },
  { id: 'direccion', label: 'Dirección', disableSorting: true },
  { id: 'total', label: 'Total', disableSorting: true },
  { id: 'estado', label: 'Estado', disableSorting: true },
  { id: 'acciones', label: 'Acciones', disableSorting: true },
];
export default function OrderPaidTable({ orders, filterFn }) {
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
          <OrderPaid order={item} />
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
