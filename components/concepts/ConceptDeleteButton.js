import { Button } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import React from 'react';
import { ALL_CONCEPTS, DELETE_CONCEPT } from '@/graphql/concepts';
import Swal from 'sweetalert2';
import { useMutation } from '@apollo/client';

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
    Swal.fire({
      title: 'Deseas eliminar este concepto?',
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
          await deleteConcept({ variables: { id } });
          Swal.fire('Correct', 'Concepto de gasto eliminado', 'success');
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
