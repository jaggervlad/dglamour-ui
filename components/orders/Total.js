import { Box, Grid, Typography } from '@material-ui/core';
import { useOrder } from 'contexts/OrderProvider';
import React from 'react';

export default function Total() {
  const { total } = useOrder();

  return (
    <Grid item xs={12}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignContent="center"
        alignItems="center"
      >
        <Typography variant="h6">Total a pagar: </Typography>
        <Typography variant="body2">$ {total}</Typography>
      </Box>
    </Grid>
  );
}
