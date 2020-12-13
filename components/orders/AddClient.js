import { ALL_CLIENTS } from '@/graphql/clients';
import { useQuery } from '@apollo/client';
import {
  makeStyles,
  Grid,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useOrder } from 'contexts/OrderProvider';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

export default function AddClient() {
  const [client, setClient] = useState({});
  const { addClient } = useOrder();
  const classes = useStyles();
  const { data, loading, error } = useQuery(ALL_CLIENTS);

  useEffect(() => {
    addClient(client);
  }, [client]);

  function selectClient(slcClient) {
    setClient(slcClient);
  }

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;

  return (
    <Grid item xs={12}>
      <Typography variant="h6">Añadir Cliente</Typography>

      {data && (
        <Select
          className={classes.root}
          options={data.obtenerClientes}
          onChange={(opc) => selectClient(opc)}
          getOptionValue={(opc) => opc.id}
          getOptionLabel={(opc) => opc.nombre}
          placeholder="Seleccionar Cliente"
          noOptionsMessage={() => 'No hay Resultados'}
        />
      )}
    </Grid>
  );
}
