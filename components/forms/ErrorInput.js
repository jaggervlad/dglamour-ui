import { ErrorMessage } from '@hookform/error-message';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import React from 'react';

export default function ErrorInput({ errors, name }) {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => {
        return (
          <Grid container>
            <Grid item>
              <Alert severity="error">{message}</Alert>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}
