import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import { useQuery } from '@apollo/client';

import ProviderAddButton from './ProviderAddButton';
import ProviderTable from './ProviderTable';
import ProviderTableSkeleton from './ProviderTableSkeleton';
import AuthLayout from '../layout/AuthLayout';
import { Title } from '../customs/Title';
import Search from '../customs/Search';
import { ALL_PROVIDER } from '@/graphql/providers';

export default function ProviderList() {
  const { data, loading, error } = useQuery(ALL_PROVIDER);
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
          return items.filter(
            (x) =>
              x.nombre.toLowerCase().includes(target.value) ||
              x.ruc.toLowerCase().includes(target.value)
          );
      },
    });
  };

  return (
    <AuthLayout>
      <Grid item container xs={12} md={8} lg={12}>
        <Title>Proveedores</Title>

        <Grid
          item
          container
          spacing={4}
          alignItems="center"
          justify="space-between"
        >
          <Grid item>
            <ProviderAddButton />
          </Grid>

          <Grid item>
            <Search handleSearch={handleSearch} />
          </Grid>
        </Grid>

        {loading && <ProviderTableSkeleton />}
        {error && <Alert severity="error">{error.message}</Alert>}
        {data && (
          <ProviderTable providers={data.allProviders} filterFn={filterFn} />
        )}
      </Grid>
    </AuthLayout>
  );
}
