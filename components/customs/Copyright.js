import React from 'react';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';

export function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'MKT ©'}
      <MuiLink
        color="inherit"
        href="https://seacal.com/"
        style={{ marginRight: '5px' }}
      >
        Seacal
      </MuiLink>
      {new Date().getFullYear()}
    </Typography>
  );
}
