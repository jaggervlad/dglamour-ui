import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core';
import Swal from 'sweetalert2';
import { ALL_PRODUCTS } from '@/graphql/products';
import {
  ALL_ORDERS,
  ORDERS_DISPATCHED,
  ORDERS_PAID,
  UPDATE_ORDER,
} from '@/graphql/orders';
import { useMutation } from '@apollo/client';

const useStyles = makeStyles((theme) => ({
  pendiente: {
    background: theme.palette.warning.main,
    color: 'white',
  },
  pagado: {
    background: theme.palette.success.main,
    color: 'white',
  },
  despachado: {
    background: theme.palette.info.main,
    color: 'white',
  },
}));

export default function StatusChange(props) {
  const [actualizarPedido] = useMutation(UPDATE_ORDER, {
    refetchQueries: [
      { query: ALL_PRODUCTS },
      { query: ORDERS_DISPATCHED },
      { query: ORDERS_PAID },
      { query: ALL_ORDERS },
    ],
  });
  const clasess = useStyles();
  const { status, setStatus, client, products, id } = props;
  const [clase, setClase] = React.useState();

  React.useEffect(() => {
    classOrder();
  }, [status]);

  function classOrder() {
    if (status === 'PENDIENTE') {
      setClase(clasess.pendiente);
    } else if (status === 'PAGADO') {
      setClase(clasess.pagado);
    } else {
      setClase(clasess.despachado);
    }
  }

  const changeStatusOrder = async (newStatus) => {
    try {
      const { data } = await actualizarPedido({
        variables: {
          id,
          input: {
            estado: newStatus,
            cliente: client.id,
            pedido: products,
          },
        },
      });
      setStatus(data.actualizarPedido.estado);
    } catch (error) {
      const errorMessage = error.message.replace('Graphql error: ', '');
      Swal.fire('Error', errorMessage, 'error');
    }
  };
  return (
    <Select
      id="estado"
      value={status}
      className={clase}
      variant="outlined"
      margin="dense"
      onChange={(e) => changeStatusOrder(e.target.value)}
    >
      <MenuItem value={'PENDIENTE'}>
        <em>PENDIENTE</em>
      </MenuItem>
      <MenuItem value="PAGADO">
        <em>PAGADO</em>
      </MenuItem>
      <MenuItem value="DESPACHADO">
        <em>DESPACHADO</em>
      </MenuItem>
    </Select>
  );
}
