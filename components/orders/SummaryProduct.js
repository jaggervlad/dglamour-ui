import { Box, TextField, Typography } from '@material-ui/core';
import { useOrder } from 'contexts/OrderProvider';
import React, { useState, useEffect } from 'react';

export default function SummaryProduct({ product }) {
  const { countProducts, updateTotal } = useOrder();
  const [qtity, setQtity] = useState(0);

  useEffect(() => {
    updateQtity();
    updateTotal();
  }, [qtity]);

  function updateQtity() {
    const newProduct = { ...product, cantidad: Number(qtity) };
    countProducts(newProduct);
  }

  const { nombre, precio } = product;

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignContent="center"
      alignItems="center"
    >
      <Box width="100%">
        <Typography variant="body2">{nombre}</Typography>
        <Typography variant="body2">$ {precio}</Typography>
      </Box>

      <Box width="25%">
        <TextField
          type="number"
          placeholder="#"
          onChange={(e) => setQtity(e.target.value)}
          value={qtity}
          variant="outlined"
          margin="dense"
          fullWidth={true}
        />
      </Box>
    </Box>
  );
}
