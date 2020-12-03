import { gql } from '@apollo/client';

export const NEW_CLIENT = gql`
  mutation nuevoCliente($input: ClienteInput!) {
    nuevoCliente(input: $input) {
      id
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation eliminarCliente($id: ID!) {
    eliminarCliente(id: $id)
  }
`;

export const UPDATE_CLIENT = gql`
  mutation actualizarCliente($id: ID!, $input: ClienteInput!) {
    actualizarCliente(id: $id, input: $input) {
      id
      cedula
      nombre
      mail
      telefono
      direccion
      ciudad
    }
  }
`;

export const GET_CLIENT = gql`
  query obtenerCliente($id: ID!) {
    obtenerCliente(id: $id) {
      id
      cedula
      nombre
      mail
      telefono
      direccion
      ciudad
    }
  }
`;

export const ALL_CLIENTS = gql`
  query obtenerClientes($offset: Int) {
    obtenerClientes(offset: $offset) {
      id
      cedula
      nombre
      mail
      telefono
      direccion
      ciudad
    }
  }
`;
