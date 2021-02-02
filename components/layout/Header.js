import { useStyles } from '@/styles/makeStyles/dashboard';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';
import LogoutButton from '../customs/LogoutButton';

export default function Header({ handleDrawerOpen, user }) {
  const classes = useStyles();

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <Menu />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Bienvenido 😊 - @{user?.username}
        </Typography>

        <LogoutButton />
      </Toolbar>
    </AppBar>
  );
}
