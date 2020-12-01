import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import PersonIcon from '@material-ui/icons/Person';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { useRouter } from 'next/router';

export function MaintListItems() {
  const router = useRouter();
  return (
    <div>
      <ListItem button onClick={() => router.push('/orders')}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Pedidos" />
      </ListItem>

      <ListItem button onClick={() => router.push('/customers')}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Clientes" />
      </ListItem>

      <ListItem button onClick={() => router.push('/products')}>
        <ListItemIcon>
          <CardTravelIcon />
        </ListItemIcon>
        <ListItemText primary="Productos" />
      </ListItem>

      <ListItem button onClick={() => router.push('/reports')}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reportes" />
      </ListItem>

      <ListItem button onClick={() => router.push('/Profile')}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Perfil" />
      </ListItem>
    </div>
  );
}

// export const MainListItems = () => {
//   return (
//     <div>
//       <ListItem button>
//         <ListItemIcon>
//           <ShoppingCartIcon />
//         </ListItemIcon>
//         <ListItemText primary="Pedidos" />
//       </ListItem>

//       <ListItem button>
//         <ListItemIcon>
//           <PeopleIcon />
//         </ListItemIcon>
//         <ListItemText primary="Clientes" />
//       </ListItem>
//       <ListItem button>
//         <ListItemIcon>
//           <CardTravelIcon />
//         </ListItemIcon>
//         <ListItemText primary="Productos" />
//       </ListItem>
//       <ListItem button>
//         <ListItemIcon>
//           <BarChartIcon />
//         </ListItemIcon>
//         <ListItemText primary="Reportes" />
//       </ListItem>
//       <ListItem button>
//         <ListItemIcon>
//           <PersonIcon />
//         </ListItemIcon>
//         <ListItemText primary="Perfil" />
//       </ListItem>
//     </div>
//   );
// };

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
