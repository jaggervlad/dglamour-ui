import { gql } from '@apollo/client';

export const NEW_EXPENSE = gql`
  mutation addExpense($input: ExpenseInput!) {
    addExpense(input: $input) {
      id
    }
  }
`;

export const DELETE_EXPENSE = gql`
  mutation deleteExpense($id: ID!) {
    deleteExpense(id: $id)
  }
`;

export const UPDATE_EXPENSE = gql`
  mutation updateExpense($id: ID!, $input: ExpenseInput!) {
    updateExpense(id: $id, input: $input) {
      id
      proveedor {
        id
        nombre
      }
      concepto {
        id
        codigo
        descripcion
      }
      comprobante
      comprobanteDate
      importe
      observacion
    }
  }
`;

export const GET_EXPENSE = gql`
  query getExpense($id: ID!) {
    getExpense(id: $id) {
      id
      proveedor {
        id
        nombre
      }
      concepto {
        id
        codigo
        descripcion
      }
      comprobante
      comprobanteDate
      importe
      observacion
    }
  }
`;

export const ALL_EXPENSE = gql`
  query allExpenses {
    allExpenses {
      id
      proveedor {
        id
        nombre
      }
      concepto {
        id
        codigo
        descripcion
      }
      comprobante
      comprobanteDate
      importe
      observacion
    }
  }
`;
