import { gql } from '@apollo/client';

export const BEST_SELLERS = gql`
  query mejoresVendedores {
    mejoresVendedores {
      vendedor {
        nombre
      }
      total
    }
  }
`;

export const BEST_CLIENTS = gql`
  query mejoresClientes {
    mejoresClientes {
      cliente {
        nombre
        mail
      }
      total
    }
  }
`;


export const USER_PRODUCTIVITY = gql`
  query productivityUser{
  productivityUser{
    total
    count
  }
}
`;