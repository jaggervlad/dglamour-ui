import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useQuery } from '@apollo/client';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Alert from '@material-ui/lab/Alert';

import AuthLayout from '../layout/AuthLayout';
import { Title } from '../customs/Title';
import Search from '../customs/Search';
import { ORDERS_DISPATCHED } from '@/graphql/orders';
import OrderDispatchTable from './OrderDispatchTable';
import ButtonIcon from '../controls/ButtonIcon';
import OrderDispatchTableSkeleton from './OrderDispatchTableSkeleton';

export default function ListOrderDispatched() {
  const { data, loading, error } = useQuery(ORDERS_DISPATCHED);
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
              x.cliente?.nombre?.toLowerCase().includes(target.value) ||
              x.id.toLowerCase().includes(target.value)
          );
      },
    });
  };

  return (
    <AuthLayout>
      <Grid item container xs={12} md={8} lg={12}>
        <Title>Pedidos</Title>

        <Grid
          item
          container
          spacing={4}
          alignItems="center"
          justify="space-between"
        >
          <Grid item>
            <ButtonIcon redirect="orders">
              <ArrowBackIcon />
            </ButtonIcon>

            <ButtonIcon redirect="orderspaid">
              <MonetizationOnIcon />
            </ButtonIcon>
          </Grid>

          <Grid item>
            <Search handleSearch={handleSearch} />
          </Grid>
        </Grid>

        {loading && <OrderDispatchTableSkeleton />}
        {error && <Alert severity="error">{error.message}</Alert>}
        {data && (
          <OrderDispatchTable
            orders={data.pedidosDespachados}
            filterFn={filterFn}
          />
        )}
      </Grid>
    </AuthLayout>
  );
}
