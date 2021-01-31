import React from 'react';
import { Grid, TableCell } from '@material-ui/core';
import StatusChange from './StatusChange';
import { useStatusChange } from '@/hooks/useStatusChange';
import OrderPdfButton from './OrderPdfButton';
import OrderSeeButton from './OrderSeeButton';
export default function OrderPaid({ order }) {
  const products = order.pedido.map(({ __typename, ...product }) => product);
  const { id, total, cliente, estado, direccion } = order;
  const { nombre } = cliente;
  const { status, setStatus } = useStatusChange(estado);
  return (
    <>
      <TableCell>{id.slice(5, 10)}</TableCell>
      <TableCell align="center">{nombre}</TableCell>
      <TableCell align="center">{direccion}</TableCell>
      <TableCell align="center">${total.toFixed(2)}</TableCell>
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
        <Grid container justify="center" spacing={2}>
          <Grid item>
            <OrderPdfButton id={id} />
          </Grid>

          <Grid item>
            <OrderSeeButton id={id} />
          </Grid>
        </Grid>
      </TableCell>
    </>
  );
}
