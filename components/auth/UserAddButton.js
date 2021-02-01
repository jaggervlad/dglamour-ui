import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import Popup from '../customs/Popup';
import UserAddForm from './UserAddForm';

export default function UserAddButton() {
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
      <Popup title="Crear Categoria" openPopup={open} setOpenPopup={setOpen}>
        <UserAddForm setOpen={setOpen} />
      </Popup>
    </>
  );
}
