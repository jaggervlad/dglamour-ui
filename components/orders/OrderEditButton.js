import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import OrderEdit from './OrderEdit';

export default function OrderEditButton({ id }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
      >
        <EditIcon />
      </Button>
      <OrderEdit open={open} setOpen={setOpen} id={id} />
    </>
  );
}
