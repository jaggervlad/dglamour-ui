import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';

import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import { useRouter } from 'next/router';

export default function ListItemsSecurity() {
  const router = useRouter();
  return (
    <List component="div" disablePadding>
      <ListItem button onClick={() => router.push('/profile')}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Perfil" />
      </ListItem>

      <ListItem button onClick={() => router.push('/users')}>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Usuarios" />
      </ListItem>
    </List>
  );
}
