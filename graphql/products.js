import { gql } from '@apollo/client';

export const ALL_PRODUCTS = gql`
  query allProducts {
    allProducts {
      id
      nombre
      existencia
      precio
      marca
      undMed
      presentacion
      categoria {
        nombre
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query obtenerProducto($id: ID!) {
    obtenerProducto(id: $id) {
      id
      nombre
      existencia
      precio
      marca
      undMed
      presentacion
      categoria {
        id
        nombre
      }
    }
  }
`;

export const NEW_PRODUCT = gql`
  mutation nuevoProducto($input: ProductoInput!) {
    nuevoProducto(input: $input) {
      id
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation actualizarProducto($id: ID!, $input: ProductoInput) {
    actualizarProducto(id: $id, input: $input) {
      id
      nombre
      existencia
      precio
      marca
      undMed
      presentacion
      categoria {
        nombre
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation eliminarProducto($id: ID!) {
    eliminarProducto(id: $id)
  }
`;
