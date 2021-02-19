import { Button } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import React from 'react';
import { ALL_CLIENTS, DELETE_CLIENT } from '@/graphql/clients';
import { useMutation } from '@apollo/client';
import {
  fireDeleteModal,
  fireErrorModal,
  fireHandleDeleteModal,
} from '@/utils/fireModal';

export default function ClientDeleteButton({ id }) {
  const [eliminarCliente] = useMutation(DELETE_CLIENT, {
    update(cache) {
      const { obtenerClientes } = cache.readQuery({ query: ALL_CLIENTS });

      cache.writeQuery({
        query: ALL_CLIENTS,
        data: {
          obtenerClientes: obtenerClientes.filter(
            (current) => current.id !== id
          ),
        },
      });
    },
  });
  function handleDelete() {
    fireHandleDeleteModal().then(async (result) => {
      if (result.isConfirmed) {
        try {
          await eliminarCliente({ variables: { id } });
          fireDeleteModal();
        } catch (error) {
          const errorMessage = error.message.replace('Graphql error: ', '');
          fireErrorModal(errorMessage);
        }
      }
    });
  }
  return (
    <Button variant="contained" color="secondary" onClick={handleDelete}>
      <DeleteIcon />
    </Button>
  );
}
