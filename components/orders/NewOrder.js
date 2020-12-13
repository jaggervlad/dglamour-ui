import React from 'react';
import Grid from '@material-ui/core/Grid';
import AuthLayout from '../layout/AuthLayout';
import { Title } from '../customs/Title';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { useFormStyles } from '../../styles/makeStyles/forms';
import FormInput from '../forms/FormInput';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import AddClient from './AddClient';
import AddProducts from './AddProducts';
import SummaryOrder from './SummaryOrder';
import AddShippingCost from './AddShippingCost';
import Total from './Total';
import { OrderSchema } from 'validationSchemas/order';
import { useOrder } from 'contexts/OrderProvider';
import { ALL_ORDERS, NEW_ORDER } from '@/graphql/orders';

export default function NewOrder() {
  const router = useRouter();
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

  const { client, products, total, cost } = useOrder();
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
    };

    try {
      await nuevoPedido({
        variables: { input },
      });

      router.push('/orders');
      Swal.fire('Creado', 'Pedido creado correctamente', 'success');
    } catch (error) {
      const errorMsg = error.message.replace('Graphql error:', '');
      Swal.fire('Error', errorMsg, 'error');
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
    <AuthLayout>
      <Grid item container xs={12} md={8} lg={12}>
        <Grid
          item
          container
          spacing={4}
          alignItems="center"
          justify="space-between"
        >
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: '5px' }}
              onClick={() => router.push('/orders')}
            >
              <ArrowBackIcon />
            </Button>
          </Grid>
        </Grid>

        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Title>Nuevo Pedido</Title>

            <FormProvider {...methods}>
              <form className={classes.form}>
                <Grid container spacing={1}>
                  <AddClient />
                  <AddProducts />
                  <SummaryOrder />
                  <AddShippingCost />
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
                  onClick={handleSubmit(onSubmit)}
                >
                  crear
                </Button>
              </form>
            </FormProvider>
          </div>
        </Container>
      </Grid>
    </AuthLayout>
  );
}
