import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`;

export const ME = gql`
  query obtenerUsuario {
    obtenerUsuario {
      id
      nombre
      username
      rol
    }
  }
`;

export const LOGOUT = gql`
  mutation logout {
    logout
  }
`;

export const NEW_USER = gql`
  mutation nuevoUsuario($id: ID, $input: UsuarioInput) {
    nuevoUsuario(id: $id, input: $input) {
      id
      nombre
      username
      rol
    }
  }
`;

export const GET_USER = gql`
  query obtenerUsuario {
    obtenerUsuario {
      id
      nombre
      username
      rol
    }
  }
`;

export const USER = gql`
  query usuario($id: ID!) {
    usuario(id: $id) {
      id
      nombre
      username
      rol
    }
  }
`;

export const ALL_USERS = gql`
  query obtenerUsuarios {
    obtenerUsuarios {
      id
      nombre
      username
      rol
    }
  }
`;
