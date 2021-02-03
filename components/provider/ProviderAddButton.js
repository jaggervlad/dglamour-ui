import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ProviderAddForm from './ProviderAddForm';
import Popup from '../customs/Popup';

export default function ProviderAddButton() {
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
      <Popup title="Crear Proveedor" openPopup={open} setOpenPopup={setOpen}>
        <ProviderAddForm setOpen={setOpen} />
      </Popup>
    </>
  );
}
