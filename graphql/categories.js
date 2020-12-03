import { gql } from '@apollo/client';

export const ALL_CATEGORIES = gql`
  query obtenerCategorias {
    obtenerCategorias {
      id
      nombre
    }
  }
`;
export const GET_CATEGORIE = gql`
  query obtenerCategoria($id: ID!) {
    obtenerCategoria(id: $id) {
      id
      nombre
    }
  }
`;
export const DELETE_CATEGORIE = gql`
  mutation eliminarCategoria($id: ID!) {
    eliminarCategoria(id: $id)
  }
`;

export const NEW_CATEGORIE = gql`
  mutation nuevaCategoria($input: CategoriaInput!) {
    nuevaCategoria(input: $input) {
      id
      nombre
    }
  }
`;

export const UPDATE_CATEGORIE = gql`
  mutation actualizarCategoria($id: ID!, $input: CategoriaInput!) {
    actualizarCategoria(id: $id, input: $input) {
      id
      nombre
    }
  }
`;
