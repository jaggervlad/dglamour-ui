import React from 'react';
import OrderDeleButton from './OrderDeleteButton';
import OrderAddPaidButton from './OrderAddPaidButton';
import OrderSeeButton from './OrderSeeButton';
import OrderPdfButton from './OrderPdfButton';
import StatusChange from './StatusChange';
import { useStatusChange } from '@/hooks/useStatusChange';
import { Grid, TableCell } from '@material-ui/core';
export default function Order({ order }) {
  const products = order.pedido.map(({ __typename, ...product }) => product);
  const { id, total, cliente, estado, direccion } = order;
  const { status, setStatus } = useStatusChange(estado);
  return (
    <>
      <TableCell>{id.slice(5, 10)}</TableCell>
      <TableCell align="center" size="small">
        {cliente.nombre}
      </TableCell>
      <TableCell align="center" size="small">
        {direccion}
      </TableCell>
      <TableCell align="center"> ${total.toFixed(2)}</TableCell>
      <TableCell align="center">
        <StatusChange
          id={id}
          status={status}
          setStatus={setStatus}
          client={cliente}
          products={products}
        />
      </TableCell>

      <TableCell align="center">
        <OrderAddPaidButton id={id} />
      </TableCell>
      <TableCell align="center">
        <OrderSeeButton id={id} />
      </TableCell>
      <TableCell align="center">
        <OrderDeleButton id={id} />
      </TableCell>
    </>
  );
}
