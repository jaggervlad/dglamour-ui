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
import { ALL_CATEGORIES } from '@/graphql/categories';
import { DialogCategorie } from './NewCategorie';

export default function ListCategorie() {
  const { data, loading, error } = useQuery(ALL_CATEGORIES);
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const searchRef = useRef();

  const handleSearch = useCallback(() => {
    setSearch(searchRef.current.value);
  }, []);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <AuthLayout>
      <Grid item container xs={12} md={8} lg={12}>
        <Title>Categorias</Title>

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
              onClick={handleOpen}
            >
              <AddIcon />
            </Button>

            <DialogCategorie open={open} handleClose={handleClose} />
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
        {data && <CustomTable rows={data.obtenerCategorias} search={search} />}
      </Grid>
    </AuthLayout>
  );
}
