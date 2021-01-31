import React from 'react';
import useTable from '../table/useTable';
import { Grid, Paper, TableBody, TableCell, TableRow } from '@material-ui/core';
import ProductDeleteButton from './ProductDeleteButton';
import ProductEditButton from './ProductEditButton';

const headCells = [
  { id: 'nombre', label: 'Nombre' },
  { id: 'stock', label: 'Stock', disableSorting: true },
  { id: 'pvp', label: 'P.V.P', disableSorting: true },
  { id: 'categoria', label: 'Categoria', disableSorting: true },
  { id: 'talla', label: 'Talla', disableSorting: true },
  { id: 'acciones', label: 'Acciones', disableSorting: true },
];
export default function ProductTable({ products, filterFn }) {
  const {
    TblContainer,
    TblHead,
    TblPagination,
    EmptyRows,
    recordsAfterPagination,
  } = useTable(products, headCells, filterFn);

  const TblBody = (props) => (
    <TableBody>
      {recordsAfterPagination().map((item) => (
        <TableRow key={item.id}>
          <TableCell>{item.nombre}</TableCell>
          <TableCell align="center">{item.existencia}</TableCell>
          <TableCell align="center">$ {item.precio}</TableCell>
          <TableCell align="center">{item.categoria.nombre}</TableCell>
          <TableCell align="center">{item.presentacion}</TableCell>

          <TableCell align="center">
            <Grid container justify="center" spacing={2}>
              <Grid item>
                <ProductDeleteButton id={item.id} />
              </Grid>
              <Grid item>
                <ProductEditButton id={item.id} />
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
