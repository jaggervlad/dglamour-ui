import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import Alert from '@material-ui/lab/Alert';

import AuthLayout from '../layout/AuthLayout';
import { Title } from '../customs/Title';
import Search from '../customs/Search';
import { ORDERS_PAID } from '@/graphql/orders';
import OrderPaidTable from './OrderPaidTable';
import ButtonIcon from '../controls/ButtonIcon';
import OrderPaidTableSkeleton from './OrderPaidTableSkeleton';

export default function ListOrderPaid() {
  const { data, loading, error } = useQuery(ORDERS_PAID);
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

            <ButtonIcon redirect="ordersdispatched">
              <LocalShippingIcon />
            </ButtonIcon>
          </Grid>

          <Grid item>
            <Search handleSearch={handleSearch} />
          </Grid>
        </Grid>

        {loading && <OrderPaidTableSkeleton />}
        {error && <Alert severity="error">{error.message}</Alert>}
        {data && (
          <OrderPaidTable orders={data.pedidosPagados} filterFn={filterFn} />
        )}
      </Grid>
    </AuthLayout>
  );
}
