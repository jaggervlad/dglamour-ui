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
