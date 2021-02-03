import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import Popup from '../customs/Popup';
import ExpenseAddForm from './ExpenseAddForm';
import AddIcon from '@material-ui/icons/Add';

export default function ExpenseAddButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: '5px' }}
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Button>
      <Popup title="Crear Gasto" openPopup={open} setOpenPopup={setOpen}>
        <ExpenseAddForm setOpen={setOpen} />
      </Popup>
    </>
  );
}
