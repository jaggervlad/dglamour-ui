import React from 'react';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useMutation } from '@apollo/client';
import { ALL_CATEGORIES, DELETE_CATEGORIE } from '@/graphql/categories';
import {
  fireDeleteModal,
  fireErrorModal,
  fireHandleDeleteModal,
} from '@/utils/fireModal';

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
    fireHandleDeleteModal().then(async (result) => {
      if (result.isConfirmed) {
        try {
          await eliminarCategoria({ variables: { id } });
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
      onClick={handleDelete}
      {...props}
    >
      <DeleteIcon />
    </Button>
  );
}
