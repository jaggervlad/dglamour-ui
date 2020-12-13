import { NotSignIn } from '@/components/layout/AuthLayout';
import EditForm from '@/components/orders/EditForm';
import { GET_ORDER } from '@/graphql/orders';
import { useQuery } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';

export default function editorder() {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useQuery(GET_ORDER, { variables: { id } });

  return (
    <>
      {error && <NotSignIn />}
      {loading && <CircularProgress />}
      {data && <EditForm id={id} order={data.obtenerPedido} />}
    </>
  );
}
