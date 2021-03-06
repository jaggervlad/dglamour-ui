import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import ConceptEdit from './ConceptEdit';

export default function ConceptEditButton({ id }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        <EditIcon />
      </Button>
      <ConceptEdit open={open} setOpen={setOpen} id={id} />
    </>
  );
}
