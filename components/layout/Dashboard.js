import React from 'react';
import { useStyles } from '../../styles/makeStyles/dashboard';
import { NotSignIn } from './AuthLayout';
import Header from './Header';
import SideMenu from './SideMenu';
import MainContent from './MainContent';

export default function Dashboard({ children, user }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (!user) return <NotSignIn />;

  return (
    <div className={classes.root}>
      <Header handleDrawerOpen={handleDrawerOpen} user={user} open={open} />
      <SideMenu handleDrawerClose={handleDrawerClose} open={open} />
      <MainContent>{children}</MainContent>
    </div>
  );
}
