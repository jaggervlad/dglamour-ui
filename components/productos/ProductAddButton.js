import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import Popup from '../customs/Popup';
import ProductAddForm from './ProductAddForm';
import AddIcon from '@material-ui/icons/Add';

export default function NewProductButton() {
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
      <Popup title="Crear Producto" openPopup={open} setOpenPopup={setOpen}>
        <ProductAddForm setOpen={setOpen} />
      </Popup>
    </>
  );
}
