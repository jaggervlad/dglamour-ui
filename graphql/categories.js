import { gql } from '@apollo/client';

export const ALL_CATEGORIES = gql`
  query obtenerCategorias {
    obtenerCategorias {
      id
      nombre
    }
  }
`;
