import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_PRODUCT, ALL_PRODUCTS } from '@/graphql/products';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  fireDeleteModal,
  fireErrorModal,
  fireHandleDeleteModal,
} from '@/utils/fireModal';

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
    fireHandleDeleteModal().then(async (result) => {
      if (result.isConfirmed) {
        try {
          await eliminarProducto({ variables: { id } });
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
