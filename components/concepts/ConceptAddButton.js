import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ConceptAddForm from './ConceptAddForm';
import Popup from '../customs/Popup';

export default function ConceptAddButton(props) {
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
      <Popup
        title="Nuevo Concepto de Gasto"
        openPopup={open}
        setOpenPopup={setOpen}
      >
        <ConceptAddForm setOpen={setOpen} />
      </Popup>
    </>
  );
}
