import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import AuthLayout from '../layout/AuthLayout';
import { Title } from '../customs/Title';
import Search from '../customs/Search';
import { useQuery } from '@apollo/client';
import Alert from '@material-ui/lab/Alert';
import { ALL_CLIENTS } from '@/graphql/clients';
import ClientAddButton from './ClientAddButton';
import ClientTable from './ClientTable';
import ClientTableSkeleton from './ClientTableSkeleton';

export default function ListClient() {
  const { data, loading, error } = useQuery(ALL_CLIENTS);
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
              x.cedula.toLowerCase().includes(target.value)
          );
      },
    });
  };

  return (
    <AuthLayout>
      <Grid item container xs={12} md={8} lg={12}>
        <Title>Clientes</Title>

        <Grid
          item
          container
          spacing={4}
          alignItems="center"
          justify="space-between"
        >
          <Grid item>
            <ClientAddButton />
          </Grid>

          <Grid item>
            <Search handleSearch={handleSearch} />
          </Grid>
        </Grid>

        {loading && <ClientTableSkeleton />}
        {error && <Alert severity="error">{error.message}</Alert>}
        {data && (
          <ClientTable clients={data.obtenerClientes} filterFn={filterFn} />
        )}
      </Grid>
    </AuthLayout>
  );
}
