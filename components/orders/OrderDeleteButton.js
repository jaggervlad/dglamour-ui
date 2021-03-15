import React from 'react';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useMutation } from '@apollo/client';
import {
  ALL_ORDERS,
  DELETE_ORDER,
  ORDERS_DISPATCHED,
  ORDERS_PAID,
} from '@/graphql/orders';
import {
  fireDeleteModal,
  fireErrorModal,
  fireHandleDeleteModal,
} from '@/utils/fireModal';

export default function OrderDeleteButton({ id }) {
  const [eliminarPedido] = useMutation(DELETE_ORDER, {
    update(cache) {
      const { obtenerPedidos } = cache.readQuery({ query: ALL_ORDERS });

      cache.writeQuery({
        query: ALL_ORDERS,
        data: {
          obtenerPedidos: obtenerPedidos.filter((ped) => ped.id !== id),
        },
      });
    },
  });

  function handleDelete(e) {
    e.preventDefault();
    fireHandleDeleteModal().then(async (result) => {
      if (result.isConfirmed) {
        try {
          await eliminarPedido({
            variables: {
              id,
            },
            refetchQueries: [
              { query: ORDERS_DISPATCHED },
              { query: ORDERS_PAID },
            ],
          });
          fireDeleteModal();
        } catch (error) {
          const message = error.message.replace('Graphql error: ', '');
          fireErrorModal(message);
        }
      }

    });
  }
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={(e) => handleDelete(e)}
    >
      <DeleteIcon />
    </Button>
  );
}

export function OrderDeleteButtonRedirect({ handleClick }) {
  return (
    <Button
      size="small"
      color="secondary"
      variant="contained"
      onClick={handleClick}
    >
      <DeleteIcon />
    </Button>
  );
}
