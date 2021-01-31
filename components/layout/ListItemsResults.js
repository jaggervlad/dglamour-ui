import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import BarChartIcon from '@material-ui/icons/BarChart';
import { useRouter } from 'next/router';
import AssignmentIcon from '@material-ui/icons/Assignment';

import React from 'react';

export default function ListItemsResults() {
  const router = useRouter();
  return (
    <List>
      <ListItem button onClick={() => router.push('/indicadores')}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Indicadores" />
      </ListItem>

      <ListItem button onClick={() => router.push('/reports')}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Reportes" />
      </ListItem>
    </List>
  );
}
