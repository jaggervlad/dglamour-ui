import React from 'react';
import clsx from 'clsx';
import { Divider, Drawer, IconButton, List } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';

import { MaintListItems } from './ListItems';
import { useStyles } from '@/styles/makeStyles/dashboard';

export default function SideMenu({ handleDrawerClose, open }) {
  const classes = useStyles();
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeft />
        </IconButton>
      </div>
      <Divider />
      <List>
        <MaintListItems />
      </List>
      <Divider />
    </Drawer>
  );
}
