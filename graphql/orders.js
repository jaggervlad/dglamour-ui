import { gql } from '@apollo/client';

export const NEW_ORDER = gql`
  mutation nuevoPedido($input: PedidoInput!) {
    nuevoPedido(input: $input) {
      id
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation actualizarPedido($id: ID!, $input: PedidoInput) {
    actualizarPedido(id: $id, input: $input) {
      id
      estado
      pago
      descripcion
    }
  }
`;
export const DELETE_ORDER = gql`
  mutation eliminarPedido($id: ID!) {
    eliminarPedido(id: $id)
  }
`;

export const ORDERS_PAID = gql`
  query pedidosPagados($offset: Int) {
    pedidosPagados(offset: $offset) {
      id
      cliente {
        id
        nombre
      }
      direccion
      total
      estado
    }
  }
`;

export const ORDERS_DISPATCHED = gql`
  query pedidosDespachados($offset: Int) {
    pedidosDespachados(offset: $offset) {
      id
      cliente {
        id
        nombre
      }
      direccion
      total
      estado
    }
  }
`;
export const ALL_ORDERS = gql`
  query obtenerPedidos($offset: Int) {
    obtenerPedidos(offset: $offset) {
      id
      cliente {
        nombre
      }
      pedido {
        id
        cantidad
        nombre
        precio
      }
      total
      estado
      direccion
    }
  }
`;

export const GET_ORDER = gql`
  query obtenerPedido($id: ID!) {
    obtenerPedido(id: $id) {
      id
      pedido {
        id
        cantidad
        nombre
        precio
        existencia
        marca
      }
      cliente {
        id
        nombre
        mail
        telefono
      }
      vendedor {
        id
        nombre
      }
      total
      estado
      direccion
      pago
      descripcion
      costEnv
      descuento
    }
  }
`;

export const OBTENER_PEDIDOS_SINGLE = gql`
  query obtenerPedidos {
    obtenerPedidos {
      id
    }
  }
`;
