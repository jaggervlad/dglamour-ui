import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import AddPaidType from './AddPaidType';
export default function OrderAddPaidButton({ id }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        <EditIcon />
      </Button>
      <AddPaidType id={id} open={open} setOpen={setOpen} />
    </>
  );
}
