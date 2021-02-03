import { Button } from '@material-ui/core';
import React from 'react';
import ExpenseEdit from './ExpenseEdit';
import EditIcon from '@material-ui/icons/Edit';

export default function ExpenseEditButton({ id }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        <EditIcon />
      </Button>
      <ExpenseEdit id={id} open={open} setOpen={setOpen} />
    </>
  );
}
