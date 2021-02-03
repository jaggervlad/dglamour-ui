import { gql } from '@apollo/client';

export const NEW_PROVIDER = gql`
  mutation addProvider($input: ProviderInput!) {
    addProvider(input: $input) {
      id
    }
  }
`;

export const DELETE_PROVIDER = gql`
  mutation deleteProvider($id: ID!) {
    deleteProvider(id: $id)
  }
`;

export const UPDATE_PROVIDER = gql`
  mutation updateProvider($id: ID!, $input: ProviderInput!) {
    updateProvider(id: $id, input: $input) {
      id
      ruc
      nombre
      telefono
      direccion
      contacto
    }
  }
`;

export const GET_PROVIDER = gql`
  query getProvider($id: ID!) {
    getProvider(id: $id) {
      id
      ruc
      nombre
      telefono
      direccion
      contacto
    }
  }
`;

export const ALL_PROVIDER = gql`
  query allProviders {
    allProviders {
      id
      ruc
      nombre
      telefono
      direccion
      contacto
    }
  }
`;
