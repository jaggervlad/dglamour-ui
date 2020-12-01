import { makeStyles } from '@material-ui/core';

export const useTableStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  container: {
    width: '100%',
    maxHeight: '75vh',
  },
  table: {
    minWidth: 700,
  },
  margin: {
    margin: theme.spacing(2),
  },
}));
