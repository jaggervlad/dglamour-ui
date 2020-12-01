export function getErrorMessage(error) {
  if (error.graphQLErrors) {
    for (const graphqlError of error.graphQLErrors) {
      if (
        graphqlError.extensions &&
        graphqlError.extensions.code === 'BAD_USER_INPUT'
      ) {
        return graphqlError.message;
      }
    }
  }
}
