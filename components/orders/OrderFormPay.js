import { UPDATE_ORDER } from '@/graphql/orders';
import { useFormStyles } from '@/styles/makeStyles/forms';
import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { PaySchema } from 'validationSchemas/order';
import { Form } from '../forms/Form';
import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';

const options = [
  { id: 'BANCO', label: 'BANCO' },
  { id: 'EFECTIVO', label: 'EFECTIVO' },
  { id: 'MIXTO', label: 'MIXTO' },
];

export default function OrderFormPay({ order, id, setOpen }) {
  const preload = { descripcion: order.descripcion, pago: order.pago };
  const [actualizarPedido] = useMutation(UPDATE_ORDER);
  const classes = useFormStyles();
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
      setOpen(false);
      Swal.fire('Correcto', 'Pedido Actualizado', 'success');
    } catch (error) {
      const errorMessage = error.message.replace('Graphql error: ', '');
      Swal.fire('Error', errorMessage, 'error');
    }
  }
  return (
    <FormProvider {...methods}>
      <Form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
          guardar
        </Button>
      </Form>
    </FormProvider>
  );
}
