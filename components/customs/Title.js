import React from 'react';
import Typography from '@material-ui/core/Typography';

export function Title(props) {
  return (
    <Typography
      component="h2"
      variant="h4"
      color="primary"
      gutterBottom
      align="center"
    >
      {props.children}
    </Typography>
  );
}
