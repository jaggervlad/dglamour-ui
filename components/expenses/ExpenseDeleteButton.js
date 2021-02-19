import { Button } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import React from 'react';
import { useMutation } from '@apollo/client';
import { ALL_EXPENSE, DELETE_EXPENSE } from '@/graphql/expenses';
import {
  fireDeleteModal,
  fireErrorModal,
  fireHandleDeleteModal,
} from '@/utils/fireModal';

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
    fireHandleDeleteModal().then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteExpense({ variables: { id } });
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
