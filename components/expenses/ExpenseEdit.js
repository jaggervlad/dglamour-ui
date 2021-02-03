import React from 'react';
import ExpenseEditForm from './ExpenseEditForm';
import { useQuery } from '@apollo/client';
import Popup from '../customs/Popup';
import { ALL_PROVIDER } from '@/graphql/providers';
import { ALL_CONCEPTS } from '@/graphql/concepts';
import { GET_EXPENSE } from '@/graphql/expenses';

export default function ExpenseEdit({ id, open, setOpen }) {
  const {
    data: providers,
    loading: loadProvider,
    error: errProvider,
  } = useQuery(ALL_PROVIDER);

  const { data: concepts, loading: loadConcept, error: errConcept } = useQuery(
    ALL_CONCEPTS
  );

  const {
    data: expense,
    loading: loadExpense,
    error: errExpense,
  } = useQuery(GET_EXPENSE, { variables: { id } });

  if (loadProvider || loadConcept || loadExpense) return null;
  if (errExpense || errConcept || errProvider) return <NotSignIn />;
  const mapProvider = providers?.allProviders.map((item, i) => ({
    id: item.id,
    label: item.nombre,
  }));
  const mapConcept = concepts?.allConcepts.map((item, i) => ({
    id: item.id,
    label: item.nombre,
  }));

  return (
    <>
      {expense && (
        <Popup title="Actulizar Gasto" openPopup={open} setOpenPopup={setOpen}>
          <ExpenseEditForm
            setOpen={setOpen}
            id={id}
            expense={expense.getExpense}
            concepts={mapConcept}
            providers={mapProvider}
          />
        </Popup>
      )}
    </>
  );
}
