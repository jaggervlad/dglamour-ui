import React from 'react';
import Grid from '@material-ui/core/Grid';
import AuthLayout from '../layout/AuthLayout';
import { Title } from '../customs/Title';
import { Paper } from '@material-ui/core';
import ChartClient from './ChartClient';

export default function RecordClient() {
  return (
    <AuthLayout>
      <Grid item container xs={12} md={8} lg={12}>
        <Title>Record Clientes</Title>

        <Grid item xs={12} style={{ marginTop: '25px' }}>
          <Paper style={{ height: 'auto' }}>
            <ChartClient />
          </Paper>
        </Grid>
      </Grid>
    </AuthLayout>
  );
}
