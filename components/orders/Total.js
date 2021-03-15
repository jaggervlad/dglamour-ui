import { Grid, Typography } from '@material-ui/core';
import { useOrder } from 'contexts/OrderProvider';
import React from 'react';

export default function Total() {
  const { total } = useOrder();

  return (
    <Grid item container xs={6} direction="column">
      <Grid container alignItems="center" >
        <Grid item>
          <Typography variant="h6">Total a pagar: </Typography>
        </Grid>
        <Grid item style={{ marginLeft: "5px" }}>
          <Typography variant="body2" style={{ marginTop: '7px' }}>
            $ {total}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
