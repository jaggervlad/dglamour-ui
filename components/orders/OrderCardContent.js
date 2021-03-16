import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import RoomIcon from '@material-ui/icons/Room';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ScheduleIcon from '@material-ui/icons/Schedule';

import { formattedDate } from '@/utils/formatDate';
import OrderCardActs from './OrderCardActs';

export default function OrderCartContent({ order, id }) {
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
    descuento,
    adicional,
    createdAt,
  } = order;
  const { mail, nombre, telefono } = cliente;
  const { nombre: vendedorNombre } = vendedor;
  const formatDate = formattedDate(createdAt);
  return (
    <Card variant="outlined" elevation={5} square>
      <CardContent>
        <Grid
          container
          alignContent="center"
          alignItems="center"
          justify="space-around"
        >
          <Grid item xs={12} md={6}>
            {nombre && (
              <Box display="flex" alignItems="center" m={3}>
                <PermIdentityIcon style={{ marginRight: '15px' }} />
                <Typography variant="body1">{nombre}</Typography>
              </Box>
            )}

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

            <Box display="flex" alignItems="center" m={3}>
              <ScheduleIcon style={{ marginRight: '15px' }} />
              <Typography variant="body1">{formatDate}</Typography>
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
            <Typography variant="h4">Pedido Nº {id.slice(0, 5)}</Typography>

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

            {costEnv ? (
              <Typography variant="body1">
                Costo de Envio <span>$ {costEnv}</span>
              </Typography>
            ) : (
              ''
            )}

            {descuento ? (
              <Typography variant="body1">
                Descuento <span>$ {descuento}</span>
              </Typography>
            ) : (
              ''
            )}

            {adicional ? (
              <Typography variant="body1">
                Adicional <span>$ {adicional}</span>
              </Typography>
            ) : (
              ''
            )}

            <Typography variant="h4" style={{ marginTop: '50px' }}>
              Total a Pagar: <span style={{ fontSize: '25px' }}>$ {total}</span>
            </Typography>

            {vendedorNombre ? (
              <Typography variant="h4" style={{ marginTop: '50px' }}>
                Vendedor:{' '}
                <span style={{ fontSize: '25px' }}>{vendedorNombre}</span>
              </Typography>
            ) : (
              ''
            )}
          </Grid>
        </Grid>
      </CardContent>
      <OrderCardActs id={id} status={estado} />
    </Card>
  );
}
