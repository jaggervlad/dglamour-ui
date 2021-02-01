import React from 'react';
import useTable from '../table/useTable';
import { Grid, Paper, TableBody, TableCell, TableRow } from '@material-ui/core';
import ClientDeleteButton from './ClientDeleteButton';
import ClientEditButton from './ClientEditButton';

const headCells = [
  { id: 'nombre', label: 'Nombre' },
  { id: 'cedula', label: 'Cedula', disableSorting: true },
  { id: 'telefono', label: 'Teléfono', disableSorting: true },
  { id: 'email', label: 'Email', disableSorting: true },
  { id: 'acciones', label: 'Acciones', disableSorting: true },
];
export default function ClientTable({ clients, filterFn }) {
  const {
    TblContainer,
    TblHead,
    TblPagination,
    EmptyRows,
    recordsAfterPagination,
  } = useTable(clients, headCells, filterFn);

  const TblBody = (props) => (
    <TableBody>
      {recordsAfterPagination().map((item) => (
        <TableRow key={item.id}>
          <TableCell>{item.nombre}</TableCell>
          <TableCell align="center">{item.cedula}</TableCell>
          <TableCell align="center">0{item.telefono}</TableCell>
          <TableCell align="center">{item.mail}</TableCell>

          <TableCell align="center">
            <Grid container justify="center" spacing={2}>
              <Grid item>
                <ClientDeleteButton id={item.id} />
              </Grid>
              <Grid item>
                <ClientEditButton id={item.id} />
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
