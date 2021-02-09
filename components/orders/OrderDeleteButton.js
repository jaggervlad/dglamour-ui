import React from 'react';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2';
import { useMutation } from '@apollo/client';
import {
  ALL_ORDERS,
  DELETE_ORDER,
  ORDERS_DISPATCHED,
  ORDERS_PAID,
} from '@/graphql/orders';

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
    Swal.fire({
      title: '¿Deseas eliminar a este pedido?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar',
    }).then(async (result) => {
      if (result.value) {
        try {
          const data = await eliminarPedido({
            variables: {
              id,
            },
            refetchQueries: [
              { query: ORDERS_DISPATCHED },
              { query: ORDERS_PAID },
            ],
          });

          Swal.fire({
            title: 'Correcto',
            text: 'Pedido eliminado!',
            icon: 'success',
            timer: 1500,
          });
        } catch (error) {
          const errorMessage = error.message.replace('Graphql error: ', '');
          Swal.fire({
            title: 'Error',
            text: errorMessage,
            icon: 'error',
            timer: 3000,
          });
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
