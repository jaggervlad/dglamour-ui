import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { useRouter } from 'next/router';

export default function ListItemsProcess() {
  const router = useRouter();
  return (
    <List component="div" disablePadding>
      <ListItem button onClick={() => router.push('/orders')}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Pedidos" />
      </ListItem>

      <ListItem button onClick={() => router.push('/expenses')}>
        <ListItemIcon>
          <MonetizationOnIcon />
        </ListItemIcon>
        <ListItemText primary="Gastos" />
      </ListItem>

      <ListItem button onClick={() => router.push('/billing')}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Facturación" />
      </ListItem>
    </List>
  );
}
