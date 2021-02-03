import React from 'react';
import ConceptEditForm from './ConceptEditForm';
import { useQuery } from '@apollo/client';
import Popup from '../customs/Popup';
import { GET_CONCEPT } from '@/graphql/concepts';
import { Alert } from '@material-ui/lab';

export default function ConceptEdit(props) {
  const { id, open, setOpen } = props;
  const { data, loading, error } = useQuery(GET_CONCEPT, { variables: { id } });
  if (loading) return null;
  if (error) return <Alert severity="error">{error.message}</Alert>;
  return (
    <>
      {data.getConcept && (
        <Popup
          title="Actualizar Concepto de Gasto"
          openPopup={open}
          setOpenPopup={setOpen}
        >
          <ConceptEditForm
            setOpen={setOpen}
            id={id}
            concept={data.getConcept}
          />
        </Popup>
      )}
    </>
  );
}
