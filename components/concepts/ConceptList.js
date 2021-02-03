import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import AuthLayout from '../layout/AuthLayout';
import { Title } from '../customs/Title';
import Search from '../customs/Search';
import { useQuery } from '@apollo/client';
import Alert from '@material-ui/lab/Alert';
import ConceptAddButton from './ConceptAddButton';
import ConceptTable from './ConceptTable';
import ConceptTableSkeleton from './ConceptTableSkeleton';
import { ALL_CONCEPTS } from '@/graphql/concepts';

export default function ConceptList() {
  const { data, loading, error } = useQuery(ALL_CONCEPTS);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

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
        <Title>Concepto de Gastos</Title>

        <Grid
          item
          container
          spacing={4}
          alignItems="center"
          justify="space-between"
        >
          <Grid item>
            <ConceptAddButton />
          </Grid>

          <Grid item>
            <Search handleSearch={handleSearch} />
          </Grid>
        </Grid>

        {loading && <ConceptTableSkeleton />}
        {error && <Alert severity="error">{error.message}</Alert>}
        {data && (
          <ConceptTable concepts={data.allConcepts} filterFn={filterFn} />
        )}
      </Grid>
    </AuthLayout>
  );
}
