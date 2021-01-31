import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useFormStyles } from '../../styles/makeStyles/forms';
import FormInput from '../forms/FormInput';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import AddProducts from './AddProducts';
import SummaryOrder from './SummaryOrder';
import AddShippingCost from './AddShippingCost';
import Total from './Total';
import { OrderSchema } from 'validationSchemas/order';
import { useOrder } from 'contexts/OrderProvider';
import { ORDERS_DISPATCHED, ORDERS_PAID, UPDATE_ORDER } from '@/graphql/orders';
import { validForm } from '@/utils/orderValidForm';
import { Typography } from '@material-ui/core';
import { Form } from '../forms/Form';
import AddDiscount from './AddDiscount';

export default function OrderEditForm({ order, id, setOpen }) {
  const router = useRouter();
  const classes = useFormStyles();
  const [actualizarPedido] = useMutation(UPDATE_ORDER);

  const { products, total, cost } = useOrder();
  const methods = useForm({
    defaultValues: { direccion: order.direccion },
    resolver: yupResolver(OrderSchema),
  });

  const { handleSubmit, formState, errors } = methods;
  const { isSubmitting } = formState;

  const pedido = products.map(
    ({
      __typename,
      existencia,
      categoria,
      undMed,
      presentacion,
      codigo,
      marca,
      ...productos
    }) => productos
  );

  async function onSubmit(data) {
    const input = {
      pedido,
      total,
      direccion: data.direccion,
      costEnv: cost,
    };

    try {
      await actualizarPedido({
        variables: { input, id: id },
        refetchQueries: [{ query: ORDERS_DISPATCHED }, { query: ORDERS_PAID }],
      });

      setOpen(false);
      router.push('/orders');
      Swal.fire('Actualizado', 'Cambios guardados correctamente', 'success');
    } catch (error) {
      setOpen(false);
      const errorMsg = error.message.replace('Graphql error:', '');
      Swal.fire('Error', errorMsg, 'error');
    }
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid container item xs={12} justify="center" alignItems="center">
            <Grid item xs={3}>
              <Typography variant="h5">Cliente: </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="h6" color="textSecondary">
                {order.cliente.nombre}
              </Typography>
            </Grid>
          </Grid>

          <AddProducts />
          <SummaryOrder />
          <AddShippingCost defaultValue={order.costEnv} />
          <AddDiscount />
          <Total />

          <Grid item xs={12}>
            <FormInput
              name="direccion"
              label="Direccion de envio"
              multiline
              rowsMax={4}
              errorobj={errors}
            />
          </Grid>
        </Grid>

        <Button
          disabled={isSubmitting || validForm(products, total)}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={`${classes.submit}`}
        >
          Guardar Cambios
        </Button>
      </Form>
    </FormProvider>
  );
}
