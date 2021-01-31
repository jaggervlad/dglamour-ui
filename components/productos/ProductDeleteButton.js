import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_PRODUCT, ALL_PRODUCTS } from '@/graphql/products';
import Swal from 'sweetalert2';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export default function ProductDeleteButton({ id }) {
  const [eliminarProducto] = useMutation(DELETE_PRODUCT, {
    update(cache) {
      const { allProducts } = cache.readQuery({ query: ALL_PRODUCTS });

      cache.writeQuery({
        query: ALL_PRODUCTS,
        data: {
          allProducts: allProducts.filter((current) => current.id !== id),
        },
      });
    },
  });

  function handleDelete() {
    Swal.fire({
      title: 'Deseas eliminar este producto?',
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
          await eliminarProducto({ variables: { id } });
          Swal.fire('Correcto', 'Se eliminó el producto', 'success');
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
