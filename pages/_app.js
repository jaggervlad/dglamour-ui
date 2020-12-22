import React from 'react';
import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import { useApollo } from '../src/apollo';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from '../styles/theme';

import '@/styles/multiSelect.css';
import { OrderProvider } from 'contexts/OrderProvider';

export default function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps);

  React.useEffect(() => {
    // Remove the server-side injected CSS
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <>
      <Head>
        <title>DGlamour CRM</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ApolloProvider client={client}>
        <OrderProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </OrderProvider>
      </ApolloProvider>
    </>
  );
}
