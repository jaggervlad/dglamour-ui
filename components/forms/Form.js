import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
      margin: theme.spacing(1),
    },
  },
}));
export function Form({ children, ...props }) {
  const classes = useStyles();

  return (
    <form className={classes.root} autoComplete="off" {...props}>
      {children}
    </form>
  );
}
