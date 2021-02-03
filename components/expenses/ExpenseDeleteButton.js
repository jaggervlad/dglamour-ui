import { Button } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import React from 'react';
import Swal from 'sweetalert2';
import { useMutation } from '@apollo/client';
import { ALL_EXPENSE, DELETE_EXPENSE } from '@/graphql/expenses';

export default function ExpenseDeleteButton({ id }) {
  const [deleteExpense] = useMutation(DELETE_EXPENSE, {
    update(cache) {
      const { allExpenses } = cache.readQuery({ query: ALL_EXPENSE });

      cache.writeQuery({
        query: ALL_EXPENSE,
        data: {
          allExpenses: allExpenses.filter((current) => current.id !== id),
        },
      });
    },
  });
  function handleDelete() {
    Swal.fire({
      title: 'Deseas eliminar esto?',
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
          await deleteExpense({ variables: { id } });
          Swal.fire({
            title: 'Correct',
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
    <Button variant="contained" color="secondary" onClick={handleDelete}>
      <DeleteIcon />
    </Button>
  );
}
