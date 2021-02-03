import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormInput from '../forms/FormInput';
import { FormProvider, useForm } from 'react-hook-form';
import FormSelect from '../forms/FormSelect';
import { useQuery, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ALL_PROVIDER } from '@/graphql/providers';
import { ALL_CONCEPTS } from '@/graphql/concepts';
import { ALL_EXPENSE, NEW_EXPENSE } from '@/graphql/expenses';
import { Form } from '../forms/Form';

export default function AddForm({ setOpen }) {
  const methods = useForm({});
  const { data: providers, loading: loadProvider } = useQuery(ALL_PROVIDER);
  const { data: concepts, loading: loadConcept } = useQuery(ALL_CONCEPTS);
  const [addExpense] = useMutation(NEW_EXPENSE, {
    update(cache, { data: addExpense }) {
      const { allExpenses } = cache.readQuery({
        query: ALL_EXPENSE,
      });

      cache.writeQuery({
        query: ALL_EXPENSE,
        data: {
          allExpenses: [...allExpenses, addExpense],
        },
      });
    },
  });
  const { handleSubmit, formState, errors } = methods;
  const { isSubmitting } = formState;

  async function onSubmit(data) {
    // console.log(data.importe);
    const input = {
      proveedor: data.proveedor,
      concepto: data.concepto,
      observacion: data.observacion,
      comprobante: data.comprobante,
      importe: Number(data.importe),
    };

    try {
      await addExpense({
        variables: { input },
      });

      setOpen(false);
      Swal.fire({
        title: 'Creado',
        text: 'Se creó correctamente',
        icon: 'success',
        timer: 1500,
      });
    } catch (error) {
      setOpen(false);
      const errorMsg = error.message.replace('Graphql error:', '');
      Swal.fire({ title: 'Error', text: errorMsg, icon: 'error', timer: 1500 });
    }
  }

  const mapProvider = providers?.allProviders.map((item, i) => ({
    id: item.id,
    label: item.nombre,
  }));
  const mapConcept = concepts?.allConcepts.map((item, i) => ({
    id: item.id,
    label: item.nombre,
  }));

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          {loadProvider && <CircularProgress />}
          {mapProvider && (
            <Grid item xs={7}>
              <FormSelect
                name="proveedor"
                label="Proveedor"
                options={mapProvider}
                errorobj={errors}
              />
            </Grid>
          )}

          {loadConcept && <CircularProgress />}
          {mapConcept && (
            <Grid item xs={5}>
              <FormSelect
                name="concepto"
                label="Concepto"
                options={mapConcept}
                errorobj={errors}
              />
            </Grid>
          )}

          <Grid item xs={6}>
            <FormInput
              name="comprobante"
              label="Comprobante"
              errorobj={errors}
            />
          </Grid>

          <Grid item xs={6}>
            <FormInput
              type="number"
              name="importe"
              label="Importe"
              errorobj={errors}
            />
          </Grid>

          <Grid item xs={12}>
            <FormInput
              name="observacion"
              label="Observación"
              errorobj={errors}
            />
          </Grid>
        </Grid>

        <Button
          disabled={isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          crear
        </Button>
      </Form>
    </FormProvider>
  );
}