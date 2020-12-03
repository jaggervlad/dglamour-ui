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
  mutation nuevoUsuario($input: UsuarioInput) {
    nuevoUsuario(input: $input) {
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
