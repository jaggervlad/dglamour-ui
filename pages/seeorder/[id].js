import AuthLayout, { NotSignIn } from '@/components/layout/AuthLayout';
import { GET_ORDER } from '@/graphql/orders';
import { useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import RoomIcon from '@material-ui/icons/Room';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DeleteIcon from '@material-ui/icons/Delete';
import PrintIcon from '@material-ui/icons/Print';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { handleShippingOrder } from '@/utils/events/pdf';
import React from 'react';
import Link from 'next/link';
import { useDeleteOrderRedirect } from '@/hooks/useDeleteOrder';

export default function seeorder() {
  const router = useRouter();
  const { id } = router.query;
  const { handleDelete } = useDeleteOrderRedirect(id);
  const { loading, error, data } = useQuery(GET_ORDER, {
    variables: { id },
  });
  if (loading) return <CircularProgress />;
  if (error) return <NotSignIn />;

  const {
    cliente,
    descripcion,
    direccion,
    estado,
    pago,
    pedido,
    total,
    vendedor,
    costEnv,
  } = data.obtenerPedido;
  const { mail, nombre, telefono } = cliente;
  const { nombre: vendedorNombre } = vendedor;

  return (
    <AuthLayout>
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: '5px', marginBottom: '20px' }}
        onClick={() => router.push('/orders')}
      >
        <ArrowBackIcon />
      </Button>

      <Grid container justify="center" spacing={2}>
        <Grid item xs={12}>
          <Card variant="outlined" elevation={5} square>
            <CardContent>
              <Grid
                container
                alignContent="center"
                alignItems="center"
                justify="space-around"
              >
                <Grid item xs={12} md={6}>
                  <Box display="flex" alignItems="center" m={3}>
                    <PermIdentityIcon style={{ marginRight: '15px' }} />
                    <Typography variant="body1">{nombre}</Typography>
                  </Box>

                  <Box display="flex" alignItems="center" m={3}>
                    <MailOutlineIcon style={{ marginRight: '15px' }} />
                    <Typography variant="body1">{mail}</Typography>
                  </Box>

                  <Box display="flex" alignItems="center" m={3}>
                    <PhoneIcon style={{ marginRight: '15px' }} />
                    <Typography variant="body1">{telefono}</Typography>
                  </Box>

                  <Box display="flex" alignItems="center" m={3}>
                    <RoomIcon style={{ marginRight: '15px' }} />
                    <Typography variant="body1">{direccion}</Typography>
                  </Box>

                  {pago && (
                    <Box display="flex" alignItems="center" m={3}>
                      <AttachMoneyIcon style={{ marginRight: '15px' }} />
                      <Typography variant="body1">{pago}</Typography>
                    </Box>
                  )}

                  <Typography variant="h4">{descripcion}</Typography>

                  <Typography variant="h6" color="secondary">
                    Estado Pedido:
                  </Typography>
                  <Typography variant="h3">{estado}</Typography>
                </Grid>

                <Grid item xs={12} md={6} style={{ marginTop: '20px' }}>
                  <Typography variant="h4">
                    Pedido Nº {id.slice(0, 5)}
                  </Typography>

                  <Box m={1}>
                    {pedido.map((product) => (
                      <div key={product.id}>
                        <Typography variant="body1">
                          Producto: {product.nombre}
                        </Typography>
                        <Typography variant="body1">
                          Cantidad: {product.cantidad}
                        </Typography>
                      </div>
                    ))}
                  </Box>

                  {costEnv && (
                    <Typography variant="body1">
                      Costo de Envio <span>$ {costEnv}</span>
                    </Typography>
                  )}

                  <Typography variant="h4" style={{ marginTop: '50px' }}>
                    Total a Pagar:{' '}
                    <span style={{ fontSize: '25px' }}>$ {total}</span>
                  </Typography>

                  <Typography variant="h4" style={{ marginTop: '50px' }}>
                    Vendedor:{' '}
                    <span style={{ fontSize: '25px' }}>{vendedorNombre}</span>
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={handleDelete}
              >
                <DeleteIcon />
              </Button>

              <Link href="/order/[id]" as={`/order/${id}`}>
                <Button size="small" color="primary" variant="contained">
                  <EditIcon />
                </Button>
              </Link>

              <Button
                size="small"
                variant="contained"
                onClick={(e) => handleShippingOrder(id, e)}
              >
                <PrintIcon />
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </AuthLayout>
  );
}
