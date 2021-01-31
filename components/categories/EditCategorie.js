import React from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { GET_CATEGORIE, UPDATE_CATEGORIE } from '@/graphql/categories';

import CircularProgress from '@material-ui/core/CircularProgress';
import Popup from '../customs/Popup';
import CategorieEditForm from './CategorieEditForm';

export default function EditCategorie(props) {
  const { open, setOpen, id } = props;
  const [actualizarCategoria] = useMutation(UPDATE_CATEGORIE);
  const { data, loading, error } = useQuery(GET_CATEGORIE, {
    variables: { id },
  });

  if (loading) return null;
  if (error) return <Alert severity="error">{error.message}</Alert>;

  return (
    <>
      {data.obtenerCategoria && (
        <Popup
          title="Actualizar Categoria"
          openPopup={open}
          setOpenPopup={setOpen}
        >
          <CategorieEditForm
            setOpen={setOpen}
            id={id}
            actualizarCategoria={actualizarCategoria}
            categoria={data.obtenerCategoria}
          />
        </Popup>
      )}
    </>
  );
}
