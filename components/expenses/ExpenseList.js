import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import { useQuery } from '@apollo/client';

import ExpenseTable from './ExpenseTable';
import ExpenseTableSkeleton from './ExpenseTableSkeleton';
import AuthLayout from '../layout/AuthLayout';
import { Title } from '../customs/Title';
import Search from '../customs/Search';
import { ALL_EXPENSE } from '@/graphql/expenses';
import ExpenseAddButton from './ExpenseAddButton';

export default function ExpenseList() {
  const { data, loading, error } = useQuery(ALL_EXPENSE);
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
          return items.filter(
            (x) =>
              x.nombre.toLowerCase().includes(target.value) ||
              x.ruc.toLowerCase().includes(target.value)
          );
      },
    });
  };

  return (
    <AuthLayout>
      <Grid item container xs={12} md={8} lg={12}>
        <Title>Gastos</Title>

        <Grid
          item
          container
          spacing={4}
          alignItems="center"
          justify="space-between"
        >
          <Grid item>
            <ExpenseAddButton />
          </Grid>

          <Grid item>
            <Search handleSearch={handleSearch} />
          </Grid>
        </Grid>

        {loading && <ExpenseTableSkeleton />}
        {error && <Alert severity="error">{error.message}</Alert>}
        {data && (
          <ExpenseTable expenses={data.allExpenses} filterFn={filterFn} />
        )}
      </Grid>
    </AuthLayout>
  );
}
