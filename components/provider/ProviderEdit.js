import React from 'react';
import ProviderEditForm from './ProviderEditForm';
import { useQuery } from '@apollo/client';
import Popup from '../customs/Popup';
import { GET_PROVIDER } from '@/graphql/providers';

export default function ProviderEdit(props) {
  const { id, open, setOpen } = props;
  const { data, loading, error } = useQuery(GET_PROVIDER, {
    variables: { id },
  });
  if (loading) return null;
  if (error) return <Alert severity="error">{error.message}</Alert>;
  return (
    <>
      {data.getProvider && (
        <Popup
          title="Actualizar Proveedor"
          openPopup={open}
          setOpenPopup={setOpen}
        >
          <ProviderEditForm
            setOpen={setOpen}
            id={id}
            provider={data.getProvider}
          />
        </Popup>
      )}
    </>
  );
}
