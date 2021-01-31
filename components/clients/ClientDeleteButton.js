import { Button } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import React from 'react';
import { ALL_CLIENTS, DELETE_CLIENT } from '@/graphql/clients';
import Swal from 'sweetalert2';
import { useMutation } from '@apollo/client';

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
    Swal.fire({
      title: 'Deseas eliminar este cliente?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await eliminarCliente({ variables: { id } });
          Swal.fire('Correct', 'Cliente eliminado', 'success');
        } catch (error) {
          const errorMessage = error.message.replace('Graphql error: ', '');
          Swal.fire('Error', errorMessage, 'error');
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
