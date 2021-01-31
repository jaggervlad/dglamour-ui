import { Button } from '@material-ui/core';
import React from 'react';
import EditProduct from './EditProduct';
import EditIcon from '@material-ui/icons/Edit';

export default function EditProductButton({ id }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        <EditIcon />
      </Button>
      <EditProduct id={id} open={open} setOpen={setOpen} />
    </>
  );
}
