import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import EditCategorie from './EditCategorie';

export default function EditButton(props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        <EditIcon />
      </Button>
      <EditCategorie id={props.id} open={open} setOpen={setOpen} />
    </>
  );
}
