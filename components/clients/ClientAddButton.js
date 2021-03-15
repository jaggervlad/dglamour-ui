import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClientAddForm from './ClientAddForm';
import Popup from '../customs/Popup';

export default function ClientAddButton({ iconRender }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: '5px' }}
        onClick={() => setOpen(true)}
      >
        {iconRender ? iconRender : <AddIcon />}

      </Button>
      <Popup title="Crear Cliente" openPopup={open} setOpenPopup={setOpen}>
        <ClientAddForm setOpen={setOpen} />
      </Popup>
    </>
  );
}
