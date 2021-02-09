import React from 'react';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';

import { ALL_CATEGORIES, DELETE_CATEGORIE } from '@/graphql/categories';

export default function CategorieDeleteButton({ id, children, ...props }) {
  const [eliminarCategoria] = useMutation(DELETE_CATEGORIE, {
    update(cache) {
      const { obtenerCategorias } = cache.readQuery({ query: ALL_CATEGORIES });

      cache.writeQuery({
        query: ALL_CATEGORIES,
        data: {
          obtenerCategorias: obtenerCategorias.filter(
            (current) => current.id !== id
          ),
        },
      });
    },
  });

  function handleDelete() {
    Swal.fire({
      title: 'Deseas eliminar esta categoria?',
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
          await eliminarCategoria({ variables: { id } });
          Swal.fire({
            title: 'Correcto',
            text: 'Eliminado',
            icon: 'success',
            timer: 1500,
          });
        } catch (error) {
          const errorMessage = error.message.replace('Graphql error: ', '');
          Swal.fire({
            title: 'Error',
            text: errorMessage,
            icon: 'error',
            timer: 1500,
          });
        }
      }
    });
  }
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={handleDelete}
      {...props}
    >
      <DeleteIcon />
    </Button>
  );
}
