import React from 'react';

import { useQuery } from '@apollo/client';

import Popup from '../customs/Popup';
import UserEditForm from './UserEditForm';
import { GET_USER } from '@/graphql/auth';
import { Alert } from '@material-ui/lab';

export default function UserEdit({ open, setOpen, id }) {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id },
  });

  if (loading) return null;
  if (error) return <Alert severity="error">{error.message}</Alert>;

  return (
    <>
      {data.usuario && (
        <Popup
          title="Actualizar Usuario"
          openPopup={open}
          setOpenPopup={setOpen}
        >
          <UserEditForm setOpen={setOpen} id={id} user={data.usuario} />
        </Popup>
      )}
    </>
  );
}
