import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import UserEdit from './UserEdit';

export default function UserEditButton({ id }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        <EditIcon />
      </Button>
      <UserEdit id={id} open={open} setOpen={setOpen} />
    </>
  );
}
