import { ALL_PRODUCTS } from '@/graphql/products';
import { useQuery } from '@apollo/client';
import {
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useOrder } from 'contexts/OrderProvider';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));
export default function AddProducts() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const { addProduct, updateTotal } = useOrder();
  const { data, loading, error } = useQuery(ALL_PRODUCTS);

  useEffect(() => {
    if (products === null) {
      setProducts([]);
      updateTotal();
    } else {
      addProduct(products);
      updateTotal();
    }
  }, [products]);

  function selectProducts(products) {
    setProducts(products);
  }

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;

  return (
    <Grid item xs={12}>
      <Typography variant="h6">Añadir Productos</Typography>

      {data && (
        <Select
          className={classes.root}
          isMulti={true}
          options={data.allProducts}
          onChange={(opc) => selectProducts(opc)}
          getOptionValue={(opc) => opc.id}
          getOptionLabel={(opc) =>
            `${opc.nombre}  |  Stock: ${opc.existencia} | Marca: ${opc.marca}`
          }
          placeholder="Seleccionar Productos"
          noOptionsMessage={() => 'No hay Resultados'}
        />
      )}
    </Grid>
  );
}
