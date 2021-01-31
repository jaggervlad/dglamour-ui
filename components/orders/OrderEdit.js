import React from 'react';
import OrderEditForm from './OrderEditForm';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from '@apollo/client';
import Popup from '../customs/Popup';
import { GET_ORDER } from '@/graphql/orders';
import Alert from '@material-ui/lab/Alert';

export default function OrderEdit({ id, open, setOpen }) {
  const { data, loading, error } = useQuery(GET_ORDER, { variables: { id } });
  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;

  return (
    <>
      {data && (
        <Popup
          title="Actualizar Pedido"
          openPopup={open}
          setOpenPopup={setOpen}
        >
          <OrderEditForm id={id} setOpen={setOpen} order={data.obtenerPedido} />
        </Popup>
      )}
    </>
  );
}
