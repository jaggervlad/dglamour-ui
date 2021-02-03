import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import ProviderEdit from './ProviderEdit';

export default function ProviderEditButton({ id }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        <EditIcon />
      </Button>
      <ProviderEdit open={open} setOpen={setOpen} id={id} />
    </>
  );
}
