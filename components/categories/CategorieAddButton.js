import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import Popup from '../customs/Popup';
import { CategorieAddForm } from './CategorieAddForm';

export default function CategorieAddButton({ iconRender }) {
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
      <Popup title="Crear Categoria" openPopup={open} setOpenPopup={setOpen}>
        <CategorieAddForm setOpen={setOpen} />
      </Popup>
    </>
  );
}
