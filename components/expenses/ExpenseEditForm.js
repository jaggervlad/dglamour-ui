import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormInput from '../forms/FormInput';
import { FormProvider, useForm } from 'react-hook-form';
import FormSelect from '../forms/FormSelect';

import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { UPDATE_EXPENSE } from '@/graphql/expenses';
import { Form } from '../forms/Form';

export default function ExpenseEditForm({
  id,
  providers,
  concepts,
  expense,
  setOpen,
}) {
  const [updateExpense] = useMutation(UPDATE_EXPENSE);

  const { proveedor, concepto, comprobante, importe, observacion } = expense;
  const preload = {
    proveedor: proveedor.id,
    concepto: concepto.id,
    comprobante,
    importe,
    observacion,
  };
  const methods = useForm({
    defaultValues: preload,
  });

  const { handleSubmit, formState, errors } = methods;
  const { isSubmitting } = formState;

  async function onSubmit(data) {
    const input = {
      proveedor: data.proveedor,
      concepto: data.concepto,
      observacion: data.observacion,
      comprobante: data.comprobante,
      importe: Number(data.importe),
    };

    try {
      await updateExpense({
        variables: { id, input },
      });

      setOpen(false);
      Swal.fire({
        title: 'Actulizado',
        text: 'Editado correctamente',
        icon: 'success',
        timer: 1500,
      });
    } catch (error) {
      setOpen(false);
      const errorMsg = error.message.replace('Graphql error:', '');
      Swal.fire({ title: 'Error', text: errorMsg, icon: 'error', timer: 1500 });
    }
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          {providers && (
            <Grid item xs={7}>
              <FormSelect
                name="proveedor"
                label="Proveedor"
                options={providers}
                errorobj={errors}
              />
            </Grid>
          )}

          {concepts && (
            <Grid item xs={5}>
              <FormSelect
                name="concepto"
                label="Concepto"
                options={concepts}
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
          guardar cambios
        </Button>
      </Form>
    </FormProvider>
  );
}
