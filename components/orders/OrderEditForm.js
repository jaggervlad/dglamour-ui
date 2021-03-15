import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useFormStyles } from '../../styles/makeStyles/forms';
import FormInput from '../forms/FormInput';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import AddProducts from './AddProducts';
import SummaryOrder from './SummaryOrder';
import AddShippingCost from './AddShippingCost';
import Total from './Total';
import { OrderSchema } from 'validationSchemas/order';
import { useOrder } from 'contexts/OrderProvider';
import { GET_ORDER, ORDERS_DISPATCHED, ORDERS_PAID, UPDATE_ORDER } from '@/graphql/orders';
import { validForm } from '@/utils/orderValidForm';
import { Typography } from '@material-ui/core';
import { Form } from '../forms/Form';
import AddDiscount from './AddDiscount';
import AddClient from './AddClient';
import { fireEditModal, fireErrorModal } from '@/utils/fireModal';

export default function OrderEditForm({ order, id, setOpen }) {
  const classes = useFormStyles();
  const [actualizarPedido] = useMutation(UPDATE_ORDER);

  const { products, total, cost, client } = useOrder();
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
      cliente: client.id
    };

    try {
      await actualizarPedido({
        variables: { input, id: id },
        refetchQueries: [
          { query: ORDERS_DISPATCHED },
          { query: ORDERS_PAID },
          { query: GET_ORDER, variables: { id } }
        ],
      });

      setOpen(false);
      fireEditModal();
    } catch (error) {
      setOpen(false);
      const errorMsg = error.message.replace('Graphql error:', '');
      fireErrorModal(errorMsg);
    }
  }

  const { mail, telefono, __typename, ...orderClient } = order.cliente
  // const defaultProducts = order.pedido.map(({ __typename, ...product }) => ({ ...product }))

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>

          <AddClient defaultValue={orderClient} />
          <AddProducts />
          <SummaryOrder />
          <Grid container item spacing={2} alignItems="center">
            <AddShippingCost defaultValue={order.costEnv} />
            <AddDiscount defaultValue={order.descuento} />
            <Total />
          </Grid>

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

function ShowClient({ nombre }) {
  return (
    <Grid container item xs={12} justify="center" alignItems="center">
      <Grid item xs={3}>
        <Typography variant="h5">Cliente: </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography variant="h6" color="textSecondary">
          {nombre}
        </Typography>
      </Grid>
    </Grid>
  )
}
