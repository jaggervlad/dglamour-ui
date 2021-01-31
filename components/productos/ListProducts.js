import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import { useQuery } from '@apollo/client';

import AuthLayout from '../layout/AuthLayout';
import Search from '../customs/Search';
import ProductAddButton from './ProductAddButton';
import ProductTable from './ProductTable';
import { Title } from '../customs/Title';
import { ALL_PRODUCTS } from '@/graphql/products';

export default function ListProducts() {
  const { data, loading, error } = useQuery(ALL_PRODUCTS);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == '') return items;
        else
          return items.filter((x) =>
            x.nombre.toLowerCase().includes(target.value)
          );
      },
    });
  };

  return (
    <AuthLayout>
      <Grid item container xs={12} md={8} lg={12}>
        <Title>Productos</Title>

        <Grid
          item
          container
          spacing={4}
          alignItems="center"
          justify="space-between"
        >
          <Grid item>
            <ProductAddButton />
          </Grid>

          <Grid item>
            <Search handleSearch={handleSearch} />
          </Grid>
        </Grid>

        {loading && <CircularProgress />}
        {error && <Alert severity="error">error.message</Alert>}
        {data && (
          <ProductTable products={data.allProducts} filterFn={filterFn} />
        )}
      </Grid>
    </AuthLayout>
  );
}
