import { Button } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import React from 'react';
import { ALL_CONCEPTS, DELETE_CONCEPT } from '@/graphql/concepts';
import { useMutation } from '@apollo/client';
import {
  fireDeleteModal,
  fireErrorModal,
  fireHandleDeleteModal,
} from '@/utils/fireModal';

export default function ConceptDeleteButton({ id }) {
  const [deleteConcept] = useMutation(DELETE_CONCEPT, {
    update(cache) {
      const { allConcepts } = cache.readQuery({ query: ALL_CONCEPTS });

      cache.writeQuery({
        query: ALL_CONCEPTS,
        data: {
          allConcepts: allConcepts.filter((current) => current.id !== id),
        },
      });
    },
  });
  function handleDelete() {
    fireHandleDeleteModal().then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteConcept({ variables: { id } });
          fireDeleteModal();
        } catch (error) {
          const errorMsg = error.message.replace('Graphql error: ', '');
          fireErrorModal(errorMsg);
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
