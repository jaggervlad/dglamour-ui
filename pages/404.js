import {
  Button,
  Container,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { useRouter } from 'next/router';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '200px',
  },
}));

export default function Custom404() {
  const classes = useStyles();
  const router = useRouter();
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Typography variant="h4" component="h2" gutterBottom>
          Estamos trabajando en mejoras
        </Typography>

        <Button
          onClick={() => router.back()}
          variant="contained"
          color="primary"
          startIcon={<ArrowBack />}
        >
          Volver atrás
        </Button>
      </Paper>
    </Container>
  );
}
