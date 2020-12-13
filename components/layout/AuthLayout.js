import { useQuery } from '@apollo/client';
import React from 'react';
import { ME } from '@/graphql/auth';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Link from '../customs/Links';
import Dashboard from './Dashboard';
import { Copyright } from '../customs/Copyright';
import { useStyles } from '../../styles/makeStyles/login';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useRouter } from 'next/router';

export function NotSignIn() {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Please LogIn!
        </Typography>

        <Grid container justify="center">
          <Grid item>
            <Link href="/signin" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </div>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default function AuthLayout({ children }) {
  const { data, loading, error } = useQuery(ME);
  const me = data?.obtenerUsuario;

  if (loading) return <CircularProgress />;
  if (error) return <NotSignIn />;

  if (me !== undefined) {
    return <Dashboard user={me}>{children}</Dashboard>;
  }

  return <NotSignIn />;
}
