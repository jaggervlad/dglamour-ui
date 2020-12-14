import React from 'react';
import { useRouter } from 'next/router';

import { Title } from '../customs/Title';
import { useFormStyles } from '@/styles/makeStyles/forms';
import EditForm from './EditForm';

import Grid from '@material-ui/core/Grid';
import AuthLayout from '../layout/AuthLayout';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useQuery } from '@apollo/client';
import { USER } from '@/graphql/auth';

export default function EditUser(props) {
  const { id } = props;
  const router = useRouter();
  const classes = useFormStyles();

  const { data, loading, error } = useQuery(USER, { variables: { id } });

  return (
    <AuthLayout>
      <Grid item container xs={12} md={8} lg={12}>
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
              onClick={() => router.push('/users')}
            >
              <ArrowBackIcon />
            </Button>
          </Grid>
        </Grid>

        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Title>Editar Usuario</Title>
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error.message}</Alert>}
            {data && <EditForm user={data.usuario} id={id} />}
          </div>
        </Container>
      </Grid>
    </AuthLayout>
  );
}
