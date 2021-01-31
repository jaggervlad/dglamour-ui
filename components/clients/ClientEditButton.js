import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import EditClient from './EditClient';

export default function ClientEditButton({ id }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        <EditIcon />
      </Button>
      <EditClient open={open} setOpen={setOpen} id={id} />
    </>
  );
}
