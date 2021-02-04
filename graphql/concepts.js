import { gql } from '@apollo/client';

export const NEW_CONCEPT = gql`
  mutation addConcept($input: ConceptInput!) {
    addConcept(input: $input) {
      id
    }
  }
`;

export const DELETE_CONCEPT = gql`
  mutation deleteConcept($id: ID!) {
    deleteConcept(id: $id)
  }
`;

export const UPDATE_CONCEPT = gql`
  mutation updateConcept($id: ID!, $input: ConceptInput!) {
    updateConcept(id: $id, input: $input) {
      id
      codigo
      descripcion
    }
  }
`;

export const GET_CONCEPT = gql`
  query getConcept($id: ID!) {
    getConcept(id: $id) {
      id
      codigo
      descripcion
    }
  }
`;

export const ALL_CONCEPTS = gql`
  query allConcepts {
    allConcepts {
      id
      codigo
      descripcion
    }
  }
`;
