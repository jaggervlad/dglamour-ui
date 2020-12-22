import Link from 'next/link';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import AuthLayout, { NotSignIn } from '../layout/AuthLayout';
import { Title } from '../customs/Title';
import Button from '@material-ui/core/Button';
import { useQuery } from '@apollo/client';
import { ME } from '@/graphql/auth';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import FaceIcon from '@material-ui/icons/Face';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import EditIcon from '@material-ui/icons/Edit';

export default function Profile() {
  const { data, loading, error } = useQuery(ME);
  const me = data?.obtenerUsuario;

  if (loading) return <CircularProgress />;
  if (error) return <NotSignIn />;
  const { id } = me;
  return (
    <AuthLayout>
      <Grid container item xs={12} md={8} lg={12}>
        <Title>Perfil</Title>

        <Grid
          container
          item
          justify="center"
          xs={12}
          style={{ marginTop: '25px' }}
        >
          <Grid item xs={10}>
            <Card variant="outlined" elevation={5} square>
              <CardContent>
                <Grid
                  container
                  alignContent="center"
                  alignItems="center"
                  justify="space-around"
                >
                  <Grid item xs={12} md={8}>
                    <Box display="flex" alignItems="center" m={3}>
                      <FaceIcon style={{ marginRight: '15px' }} />
                      <Typography variant="body1">{me.nombre}</Typography>
                    </Box>

                    <Box display="flex" alignItems="center" m={3}>
                      <AlternateEmailIcon style={{ marginRight: '15px' }} />
                      <Typography variant="body1">{me.username}</Typography>
                    </Box>

                    <Box display="flex" alignItems="center" m={3}>
                      <MailIcon style={{ marginRight: '15px' }} />
                      <Typography variant="body1">{me.rol}</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={4} style={{ marginTop: '20px' }}>
                    <Typography variant="h4">Foto de Perfil</Typography>
                  </Grid>
                </Grid>
              </CardContent>

              <CardActions>
                <Link href="/user/[id]" as={`/user/${id}`}>
                  <Button size="small" color="primary" variant="contained">
                    <EditIcon />
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </AuthLayout>
  );
}
