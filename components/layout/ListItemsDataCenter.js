import React from 'react';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import PeopleIcon from '@material-ui/icons/People';
import CategoryIcon from '@material-ui/icons/Category';
import PaymentIcon from '@material-ui/icons/Payment';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import { useRouter } from 'next/router';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
export default function ListItemsDataCenter() {
  const router = useRouter();

  return (
    <List component="div" disablePadding>
      <ListItem button onClick={() => router.push('/categories')}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Categorias" />
      </ListItem>

      <ListItem button onClick={() => router.push('/products')}>
        <ListItemIcon>
          <CardTravelIcon />
        </ListItemIcon>
        <ListItemText primary="Productos" />
      </ListItem>

      <ListItem button onClick={() => router.push('/clients')}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Clientes" />
      </ListItem>

      <ListItem button onClick={() => router.push('/providers')}>
        <ListItemIcon>
          <PermContactCalendarIcon />
        </ListItemIcon>
        <ListItemText primary="Proveedores" />
      </ListItem>

      <ListItem button onClick={() => router.push('/conpexpenses')}>
        <ListItemIcon>
          <PaymentIcon />
        </ListItemIcon>
        <ListItemText primary="Concep Gastos" />
      </ListItem>
    </List>
  );
}
