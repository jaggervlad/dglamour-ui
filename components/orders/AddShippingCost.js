import { Grid, TextField, Typography } from '@material-ui/core';
import { useOrder } from 'contexts/OrderProvider';
import React, { useState, useEffect } from 'react';

export default function AddShippingCost() {
  const [costEnv, setCostEnv] = useState(0);
  const { addShippingCost, updateTotal } = useOrder();

  useEffect(() => {
    addShippingCost(Number(costEnv));
    updateTotal();
  }, [costEnv]);

  function handleChange(param) {
    setCostEnv(param);
  }

  return (
    <Grid item xs={12}>
      <Typography variant="h6">Añadir Costo Envio</Typography>

      <TextField
        type="number"
        value={costEnv}
        label="Envio"
        onChange={(e) => handleChange(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth={true}
      />
    </Grid>
  );
}
