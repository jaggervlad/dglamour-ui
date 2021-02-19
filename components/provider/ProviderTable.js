import React from 'react';
import useTable from '../table/useTable';
import { Grid, Paper, TableBody, TableCell, TableRow } from '@material-ui/core';
import ProviderDeleteButton from './ProviderDeleteButton';
import ProviderEditButton from './ProviderEditButton';

const headCells = [
  { id: 'ruc', label: 'R.U.C', disableSorting: true },
  { id: 'nombre', label: 'Nombre', disableSorting: true },
  { id: 'telefono', label: 'Teléfono', disableSorting: true },
  { id: 'direccion', label: 'Dirección', disableSorting: true },
  { id: 'contacto', label: 'Contacto', disableSorting: true },
  { id: 'acciones', label: 'Acciones', disableSorting: true },
];
export default function ProviderTable({ providers, filterFn }) {
  const {
    TblContainer,
    TblHead,
    TblPagination,
    EmptyRows,
    recordsAfterPagination,
  } = useTable(providers, headCells, filterFn);

  const TblBody = (props) => (
    <TableBody>
      {recordsAfterPagination().map((item) => (
        <TableRow key={item.id}>
          <TableCell>{item.ruc}</TableCell>
          <TableCell align="center">{item.nombre}</TableCell>
          <TableCell align="center">{item.telefono}</TableCell>
          <TableCell align="center">{item.direccion}</TableCell>
          <TableCell align="center">{item.contacto}</TableCell>

          <TableCell align="center">
            <Grid container justify="center" spacing={2}>
              <Grid item>
                <ProviderDeleteButton id={item.id} />
              </Grid>
              <Grid item>
                <ProviderEditButton id={item.id} />
              </Grid>
            </Grid>
          </TableCell>
        </TableRow>
      ))}
      <EmptyRows />
    </TableBody>
  );

  return (
    <Paper style={{ width: '100%' }}>
      <TblContainer>
        <TblHead />
        <TblBody />
      </TblContainer>
      <TblPagination />
    </Paper>
  );
}
