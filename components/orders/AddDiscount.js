import { Grid, TextField, Typography } from '@material-ui/core';
import { useOrder } from 'contexts/OrderProvider';
import React, { useState, useEffect } from 'react';

export default function AddDiscount({ defaultValue }) {
  const [discount, setDiscount] = useState(defaultValue ? defaultValue : 0);
  const { addDiscount, updateTotal } = useOrder();

  useEffect(() => {
    addDiscount(Number(discount));
    updateTotal();
  }, [discount]);

  function handleChange(param) {
    setDiscount(param);
  }

  return (
    <Grid item xs={2}>
      <TextField
        type="number"
        value={discount}
        label="Descuento"
        onChange={(e) => handleChange(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth={true}
      />
    </Grid>
  );
}
