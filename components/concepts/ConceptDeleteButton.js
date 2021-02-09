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
      timer: 1500,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteConcept({ variables: { id } });
          Swal.fire({
            title: 'Correcto',
            text: 'Eliminado',
            icon: 'success',
            timer: 1500,
          });
        } catch (error) {
          const errorMsg = error.message.replace('Graphql error: ', '');
          Swal.fire({
            title: 'Error',
            text: errorMsg,
            icon: 'error',
            timer: 1500,
          });
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
