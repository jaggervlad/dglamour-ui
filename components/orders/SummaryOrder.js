import { Grid, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useOrder } from 'contexts/OrderProvider';
import React from 'react';
import SummaryProduct from './SummaryProduct';

export default function SummaryOrder() {
  const { products } = useOrder();
  return (
    <Grid item xs={12}>
      <Typography variant="h6">Añadir Cantidad</Typography>

      {products?.length > 0 ? (
        <>
          {products.map((product) => (
            <SummaryProduct key={product.id} product={product} />
          ))}
        </>
      ) : (
        <Alert severity="warning">Aún no hay productos</Alert>
      )}
    </Grid>
  );
}
