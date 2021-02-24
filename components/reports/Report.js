import React, { useCallback, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import AuthLayout from '../layout/AuthLayout';
import { Title } from '../customs/Title';
import { Button, Paper } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/luxon';
import DateInputPicker from '../forms/DateInputPicker';
import FormSelect from '../forms/FormSelect';
import MuiSelect from '../forms/MuiSelect';
import { Search } from '@material-ui/icons';

const modelsToQuery = [
  { id: 'usuarios', label: 'Usuarios' },
  { id: 'clientes', label: 'Clientes' },
  { id: 'proveedores', label: 'Proveedores' },
];

export default function Reports() {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [filter, setFilter] = useState('');

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      console.log(fromDate.toDateString());
      console.log(toDate?.toDateString());
      console.log(filter);
    },
    [fromDate, toDate, filter]
  );

  return (
    <AuthLayout>
      <Grid item container xs={12} md={8} lg={12}>
        <Title>Reportes</Title>

        <Grid container item xs={12} style={{ marginTop: '25px' }}>
          <Paper style={{ minHeight: '50vh', width: '100%' }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale="es">
              <Grid
                container
                item
                justify="center"
                direction="column"
                style={{ marginLeft: '10px' }}
              >
                <Grid item xs={2}>
                  <DateInputPicker
                    value={fromDate}
                    onChange={setFromDate}
                    label="Desde"
                  />
                </Grid>

                <Grid item xs={2}>
                  <DateInputPicker
                    value={toDate}
                    onChange={setToDate}
                    label="Hásta"
                    xs={6}
                  />
                </Grid>

                <Grid item xs={2}>
                  <MuiSelect
                    style={{ marginRight: '5px', minWidth: '200px' }}
                    name="filtro"
                    label="Filtro"
                    options={modelsToQuery}
                    value={filter}
                    handleChange={handleChange}
                  />
                </Grid>

                <Grid item xs={2}>
                  <Button
                    onClick={(e) => handleClick(e)}
                    variant="contained"
                    color="primary"
                    endIcon={<Search>Filtrar</Search>}
                  >
                    Filtrar
                  </Button>
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
          </Paper>
        </Grid>
      </Grid>
    </AuthLayout>
  );
}
