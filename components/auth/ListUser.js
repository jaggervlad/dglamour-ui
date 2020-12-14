import React, { useCallback, useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import AuthLayout from '../layout/AuthLayout';
import { Title } from '../customs/Title';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
import AddIcon from '@material-ui/icons/Add';
import CustomTable from './CustomTable';
import Search from '../customs/Search';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import { ALL_USERS } from '@/graphql/auth';

export default function ListUser() {
  const { data, loading, error } = useQuery(ALL_USERS);
  const router = useRouter();

  const [search, setSearch] = useState('');
  const searchRef = useRef();

  const handleSearch = useCallback(() => {
    setSearch(searchRef.current.value);
  }, []);

  return (
    <AuthLayout>
      <Grid item container xs={12} md={8} lg={12}>
        <Title>Usuarios</Title>

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
              onClick={() => router.push('/signup')}
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

        {loading && <CircularProgress />}
        {error && <Alert severity="error">error.message</Alert>}
        {data && <CustomTable rows={data.obtenerUsuarios} search={search} />}
      </Grid>
    </AuthLayout>
  );
}
