import { USER_PRODUCTIVITY } from '@/graphql/reports';
import { useTime } from '@/hooks/useTime';
import { useStyles } from '@/styles/makeStyles/dashboard';
import { useQuery } from '@apollo/client';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { CallMerge, Menu } from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';
import LogoutButton from '../customs/LogoutButton';

export default function Header({ handleDrawerOpen, user, open }) {
  const classes = useStyles();
  const now = useTime();
  const { data, loading, error } = useQuery(USER_PRODUCTIVITY)

  if (loading || error) return null

  const { count, total } = data?.productivityUser

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
          @{user?.username}
        </Typography>
        <Typography
          component="p"
          variant="body1"
          color="inherit"
          noWrap
          align="center"
          style={{ marginRight: "25px" }}
        >
          Prod: #{count && count}/${total && total}
        </Typography>

        <Typography
          component="p"
          variant="overline"
          color="inherit"
          noWrap
          style={{ marginRight: '5px' }}
        >
          {now}
        </Typography>

        <LogoutButton />
      </Toolbar>
    </AppBar>
  );
}
