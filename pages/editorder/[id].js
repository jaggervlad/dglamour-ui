import { Title } from '@/components/customs/Title';
import AuthLayout, { NotSignIn } from '@/components/layout/AuthLayout';
import FormPay from '@/components/orders/FormPay';
import { GET_ORDER } from '@/graphql/orders';
import { useFormStyles } from '@/styles/makeStyles/forms';
import { useQuery } from '@apollo/client';
import { Button, CircularProgress, Container, Grid } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { useRouter } from 'next/router';

export default function EditarPedido() {
  const router = useRouter();
  const classes = useFormStyles();
  const { id } = router.query;
  const { data, loading, error } = useQuery(GET_ORDER, {
    variables: { id },
  });

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
              <ArrowBack />
            </Button>
          </Grid>
        </Grid>

        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Title>Agregar Tipo de Pago</Title>

            {loading && <CircularProgress />}
            {error && <NotSignIn />}
            {data && <FormPay order={data.obtenerPedido} id={id} />}
          </div>
        </Container>
      </Grid>
    </AuthLayout>
  );
}
