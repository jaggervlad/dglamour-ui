import React, { memo, useEffect } from 'react';
import useTable from '../table/useTable';
import { Paper, TableBody, TableRow } from '@material-ui/core';
import Order from './Order';

const headCells = [
  { id: 'noPed', label: 'Nº Ped', disableSorting: true },
  { id: 'cliente', label: 'Cliente', disableSorting: true },
  { id: 'direccion', label: 'Dirección', disableSorting: true },
  { id: 'total', label: 'Total', disableSorting: true },
  { id: 'estado', label: 'Estado', disableSorting: true },
  { id: 'imprimir', label: 'Imprimir', disableSorting: true },
  { id: 'pago', label: 'Pago', disableSorting: true },
  { id: 'ver', label: 'Ver', disableSorting: true },
  { id: 'eliminar', label: 'Eliminar', disableSorting: true },
];

const OrderTable = memo(({ orders, filterFn }) => {
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagination,
    EmptyRows,
  } = useTable(orders, headCells, filterFn);

  const TblBody = (props) => (
    <TableBody>
      {recordsAfterPagination().map((item) => (
        <TableRow key={item.id}>
          <Order order={item} />
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
});

export default OrderTable;
