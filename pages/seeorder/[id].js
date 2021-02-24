import AuthLayout, { NotSignIn } from '@/components/layout/AuthLayout';
import { GET_ORDER } from '@/graphql/orders';
import { useQuery } from '@apollo/client';
import { Button, CircularProgress, Grid } from '@material-ui/core';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React from 'react';

import OrderCardContent from '@/components/orders/OrderCardContent';

export default function seeorder() {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_ORDER, {
    variables: { id },
  });

  return (
    <AuthLayout>
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: '5px', marginBottom: '20px' }}
        onClick={() => router.push('/orders')}
      >
        <ArrowBackIcon />
      </Button>

      <Grid container justify="center" spacing={2}>
        <Grid item xs={12}>
          {loading && <CircularProgress />}
          {error && <NotSignIn />}
          {data && <OrderCardContent id={id} order={data.obtenerPedido} />}
        </Grid>
      </Grid>
    </AuthLayout>
  );
}
