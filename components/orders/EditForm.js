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
import AddProducts from './AddProducts';
import SummaryOrder from './SummaryOrder';
import AddShippingCost from './AddShippingCost';
import Total from './Total';
import { OrderSchema } from 'validationSchemas/order';
import { useOrder } from 'contexts/OrderProvider';
import {
  ALL_ORDERS,
  ORDERS_DISPATCHED,
  ORDERS_PAID,
  UPDATE_ORDER,
} from '@/graphql/orders';
import { validForm } from '@/utils/orderValidForm';
import { Typography } from '@material-ui/core';

export default function EditForm(props) {
  const router = useRouter();
  const classes = useFormStyles();
  const [actualizarPedido] = useMutation(UPDATE_ORDER);

  const { products, total, cost } = useOrder();
  const methods = useForm({
    defaultValues: { direccion: props.order.direccion },
    resolver: yupResolver(OrderSchema),
  });

  const { handleSubmit, formState, errors } = methods;
  const { isSubmitting } = formState;

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
      total,
      direccion: data.direccion,
      costEnv: cost,
    };

    try {
      await actualizarPedido({
        variables: { input, id: props.id },
        refetchQueries: [{ query: ORDERS_DISPATCHED }, { query: ORDERS_PAID }],
      });

      router.push('/orders');
      Swal.fire('Actualizado', 'Cambios guardados correctamente', 'success');
    } catch (error) {
      const errorMsg = error.message.replace('Graphql error:', '');
      Swal.fire('Error', errorMsg, 'error');
    }
  }

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
            <Title>Editar Pedido</Title>

            <FormProvider {...methods}>
              <form className={classes.form}>
                <Grid container spacing={1}>
                  <Grid
                    container
                    item
                    xs={12}
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={3}>
                      <Typography variant="h5">Cliente: </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="h6" color="textSecondary">
                        {props.order.cliente.nombre}
                      </Typography>
                    </Grid>
                  </Grid>

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
                  disabled={isSubmitting || validForm(products, total)}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={`${classes.submit}`}
                  onClick={handleSubmit(onSubmit)}
                >
                  Guardar Cambios
                </Button>
              </form>
            </FormProvider>
          </div>
        </Container>
      </Grid>
    </AuthLayout>
  );
}
