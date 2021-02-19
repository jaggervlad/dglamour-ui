import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useFormStyles } from '../../styles/makeStyles/forms';
import FormInput from '../forms/FormInput';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import AddClient from './AddClient';
import AddProducts from './AddProducts';
import SummaryOrder from './SummaryOrder';
import AddShippingCost from './AddShippingCost';
import Total from './Total';
import { OrderSchema } from 'validationSchemas/order';
import { useOrder } from 'contexts/OrderProvider';
import { ALL_ORDERS, NEW_ORDER } from '@/graphql/orders';
import AddDiscount from './AddDiscount';
import { Form } from '../forms/Form';
import { fireCreateModal, fireErrorModal } from '@/utils/fireModal';

export default function OrderAddForm(props) {
  const { setOpen } = props;
  const classes = useFormStyles();
  const [nuevoPedido] = useMutation(NEW_ORDER, {
    update(cache, { data: nuevoPedido }) {
      const { obtenerPedidos } = cache.readQuery({ query: ALL_ORDERS });

      cache.writeQuery({
        query: ALL_ORDERS,
        data: {
          obtenerPedidos: [...obtenerPedidos, nuevoPedido],
        },
      });
    },
  });

  const { client, products, total, cost, discount } = useOrder();
  const methods = useForm({
    resolver: yupResolver(OrderSchema),
  });

  const { handleSubmit, formState, errors } = methods;
  const { isSubmitting } = formState;

  const { id } = client;
  const order = products.map(
    ({
      __typename,
      existencia,
      categoria,
      undMed,
      presentacion,
      codigo,
      marca,
      precioCompra,
      ...productos
    }) => productos
  );

  async function onSubmit(data) {
    const input = {
      pedido: order,
      cliente: id,
      total,
      direccion: data.direccion,
      costEnv: cost,
      descuento: discount,
    };

    try {
      await nuevoPedido({
        variables: { input },
      });

      setOpen(false);
      fireCreateModal();
    } catch (error) {
      setOpen(false);
      const errorMsg = error.message.replace('Graphql error:', '');
      fireErrorModal(errorMsg);
    }
  }

  const validForm = () => {
    return !products?.every((producto) => producto.cantidad > 0) ||
      total === 0 ||
      client.length === 0
      ? true
      : false;
  };

  return (
    <FormProvider {...methods}>
      <Form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <AddClient />
          <AddProducts />
          <SummaryOrder />
          <AddShippingCost />
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
          disabled={isSubmitting || validForm()}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={`${classes.submit}`}
        >
          crear
        </Button>
      </Form>
    </FormProvider>
  );
}
