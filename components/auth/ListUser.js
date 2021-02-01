import React, { useCallback, useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import AuthLayout from '../layout/AuthLayout';
import { Title } from '../customs/Title';
import Search from '../customs/Search';
import { useQuery } from '@apollo/client';
import Alert from '@material-ui/lab/Alert';
import { ALL_USERS } from '@/graphql/auth';
import UserAddButton from './UserAddButton';
import UserTable from './UserTable';
import UserTableSkeleton from './UserTableSkeleton';

export default function ListUser() {
  const { data, loading, error } = useQuery(ALL_USERS);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const [search, setSearch] = useState('');
  const searchRef = useRef();

  const handleSearch = (e) => {
    let target = e.target;

    setFilterFn({
      fn: (items) => {
        if (target.value == '') return items;
        else
          return items.filter((x) =>
            x.nombre.toLowerCase().includes(target.value)
          );
      },
    });
  };

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
            <UserAddButton />
          </Grid>

          <Grid item>
            <Search
              search={search}
              handleSearch={handleSearch}
              searchRef={searchRef}
            />
          </Grid>
        </Grid>

        {loading && <UserTableSkeleton />}
        {error && <Alert severity="error">{error.message}</Alert>}
        {data && <UserTable users={data.obtenerUsuarios} filterFn={filterFn} />}
      </Grid>
    </AuthLayout>
  );
}
