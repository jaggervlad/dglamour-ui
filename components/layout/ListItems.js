import React from 'react';
import StorageIcon from '@material-ui/icons/Storage';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SecurityIcon from '@material-ui/icons/Security';
import AssessmentIcon from '@material-ui/icons/Assessment';

import ListCollpase from '../controls/ListCollapse';
import ListItemsDataCenter from './ListItemsDataCenter';
import ListItemsProcess from './ListItemsProcess';
import ListItemsSecurity from './ListItemsSecurity';
import ListItemsResults from './ListItemsResults';

export function MaintListItems() {
  return (
    <div>
      <ListCollpase
        title="CENTRO DATOS"
        render={<StorageIcon color="primary" />}
        initialState={false}
      >
        <ListItemsDataCenter />
      </ListCollpase>

      <ListCollpase
        title="PROCESOS"
        render={<AccountBalanceWalletIcon color="primary" />}
        initialState={false}
      >
        <ListItemsProcess />
      </ListCollpase>

      <ListCollpase
        title="RESULTADOS"
        render={<AssessmentIcon color="primary" />}
        initialState={false}
      >
        <ListItemsResults />
      </ListCollpase>

      <ListCollpase
        title="SEGURIDAD"
        render={<SecurityIcon color="primary" />}
        initialState={false}
      >
        <ListItemsSecurity />
      </ListCollpase>
    </div>
  );
}
