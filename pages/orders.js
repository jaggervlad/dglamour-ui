import React, { useEffect } from 'react';
import ListOrder from '@/components/orders/ListOrder';
import { initializeApollo } from 'src/apollo';
import { ALL_ORDERS } from '@/graphql/orders';
export default function OrderPage(props) {
  return <ListOrder />;
}

// export async function getStaticProps() {
//   const apolloClient = initializeApollo();

//   await apolloClient.query({
//     query: ALL_ORDERS,
//   });

//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//   };
// }
