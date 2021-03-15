import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import Alert from '@material-ui/lab/Alert';
import { useQuery } from '@apollo/client';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import { Title } from '../customs/Title';
import { ALL_ORDERS } from '@/graphql/orders';
import AuthLayout from '../layout/AuthLayout';
import Search from '../customs/Search';
import OrderAddButton from './OrderAddButton';
import OrderTable from './OrderTable';
import ButtonIcon from '../controls/ButtonIcon';
import OrderTableSkeleton from './OrderTableSkeleton';
import ClientAddButton from '../clients/ClientAddButton';

export default function ListOrder() {
  const { data, loading, error } = useQuery(ALL_ORDERS);
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
            <OrderAddButton />

            <ClientAddButton iconRender={<PersonAddIcon />} />

            <ButtonIcon redirect="orderspaid">
              <MonetizationOnIcon />
            </ButtonIcon>

            <ButtonIcon redirect="ordersdispatched">
              <LocalShippingIcon />
            </ButtonIcon>
          </Grid>

          <Grid item>
            <Search handleSearch={handleSearch} />
          </Grid>
        </Grid>

        {loading && <OrderTableSkeleton />}
        {error && <Alert severity="error">{error.message}</Alert>}
        {data && (
          <OrderTable orders={data.obtenerPedidos} filterFn={filterFn} />
        )}
      </Grid>
    </AuthLayout>
  );
}
