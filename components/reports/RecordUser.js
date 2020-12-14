import React, { useCallback, useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import AuthLayout from '../layout/AuthLayout';
import { Title } from '../customs/Title';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
import AddIcon from '@material-ui/icons/Add';
import Search from '../customs/Search';
import { useQuery } from '@apollo/client';
import { ALL_PRODUCTS } from '@/graphql/products';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import ChartUser from './ChartUser';
import { Paper } from '@material-ui/core';

export default function RecordUser() {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const searchRef = useRef();

  const handleSearch = useCallback(() => {
    setSearch(searchRef.current.value);
  }, []);

  return (
    <AuthLayout>
      <Grid item container xs={12} md={8} lg={12}>
        <Title>Record de Ventas 'Vendedores'</Title>

        <Grid
          item
          container
          spacing={4}
          alignItems="center"
          justify="space-between"
        >
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: '5px' }}
              onClick={() => router.push('/newproduct')}
            >
              <AddIcon />
            </Button>
          </Grid>

          <Grid item>
            <Search
              search={search}
              handleSearch={handleSearch}
              searchRef={searchRef}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} style={{ marginTop: '25px' }}>
          <Paper style={{ height: 'auto' }}>
            <ChartUser />
          </Paper>
        </Grid>
      </Grid>
    </AuthLayout>
  );
}
