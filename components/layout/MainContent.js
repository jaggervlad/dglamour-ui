import { useStyles } from '@/styles/makeStyles/dashboard';
import { Box, Container, Grid } from '@material-ui/core';
import React from 'react';
import { Copyright } from '../customs/Copyright';

export default function MainContent({ children }) {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {children}
        </Grid>

        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </main>
  );
}
