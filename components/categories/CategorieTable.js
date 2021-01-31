import React from 'react';
import useTable from '../table/useTable';
import { Grid, Paper, TableBody, TableCell, TableRow } from '@material-ui/core';
import CategorieDeleteButton from './CategorieDeleteButton';
import CategorieEditButton from './CategorieEditButton';

const headCells = [
  { id: 'nombre', label: 'Nombre' },
  { id: 'acciones', label: 'Acciones', disableSorting: true },
];
export default function CategorieTable({ categories, filterFn }) {
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagination,
    EmptyRows,
  } = useTable(categories, headCells, filterFn);

  const TblBody = (props) => (
    <TableBody>
      {recordsAfterPagination().map((item) => (
        <TableRow key={item.id}>
          <TableCell>{item.nombre}</TableCell>
          <TableCell align="center">
            <Grid container justify="center" spacing={2}>
              <Grid item>
                <CategorieDeleteButton id={item.id} />
              </Grid>
              <Grid item>
                <CategorieEditButton id={item.id} />
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
