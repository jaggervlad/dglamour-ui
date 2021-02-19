import { Button } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import React from 'react';
import { useMutation } from '@apollo/client';
import { ALL_PROVIDER, DELETE_PROVIDER } from '@/graphql/providers';
import {
  fireDeleteModal,
  fireErrorModal,
  fireHandleDeleteModal,
} from '@/utils/fireModal';

export default function ProviderDeleteButton({ id }) {
  const [deleteProvider] = useMutation(DELETE_PROVIDER, {
    update(cache) {
      const { allProviders } = cache.readQuery({ query: ALL_PROVIDER });

      cache.writeQuery({
        query: ALL_PROVIDER,
        data: {
          allProviders: allProviders.filter((current) => current.id !== id),
        },
      });
    },
  });
  function handleDelete() {
    fireHandleDeleteModal().then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProvider({ variables: { id } });
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
