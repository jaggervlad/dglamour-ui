import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';

import Popup from '../customs/Popup';
import OrderAddForm from './OrderAddForm';
import { Button } from '@material-ui/core';

export default function OrderAddButton() {
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
      <Popup title="Crear Pedido" openPopup={open} setOpenPopup={setOpen}>
        <OrderAddForm setOpen={setOpen} />
      </Popup>
    </>
  );
}
