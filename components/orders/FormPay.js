import { UPDATE_ORDER } from '@/graphql/orders';
import { useFormStyles } from '@/styles/makeStyles/forms';
import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { PaySchema } from 'validationSchemas/order';
import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';

const options = [
  { id: 'BANCO', label: 'BANCO' },
  { id: 'EFECTIVO', label: 'EFECTIVO' },
  { id: 'MIXTO', label: 'MIXTO' },
];

export default function FormPay({ order, id }) {
  const preload = { descripcion: order.descripcion, pago: order.pago };
  const [actualizarPedido] = useMutation(UPDATE_ORDER);
  const classes = useFormStyles();
  const router = useRouter();
  const methods = useForm({
    defaultValues: preload,
    resolver: yupResolver(PaySchema),
  });
  const { handleSubmit, formState, errors } = methods;
  const { isSubmitting } = formState;

  async function onSubmit(data) {
    const input = { ...data };
    try {
      await actualizarPedido({ variables: { id, input } });
      router.push('/orders');
      Swal.fire('Correcto', 'El producto se actualió correctamente', 'success');
    } catch (error) {
      const errorMessage = error.message.replace('Graphql error: ', '');
      Swal.fire('Error', errorMessage, 'error');
    }
  }
  return (
    <FormProvider {...methods}>
      <form className={classes.form}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FormSelect
              name="pago"
              label="Seleccion pago"
              options={options}
              errorobj={errors}
            />
          </Grid>

          <Grid item xs={12}>
            <FormInput
              name="descripcion"
              label="Descripcion"
              multiline
              rowsMax={4}
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
          className={classes.submit}
          onClick={handleSubmit(onSubmit)}
        >
          guardar cambios
        </Button>
      </form>
    </FormProvider>
  );
}
