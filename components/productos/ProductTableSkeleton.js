import React from 'react';
import useTableSkeleton from '../table/useTableSkeleton';
import { Paper, TableBody, TableCell, TableRow } from '@material-ui/core';

import { Skeleton } from '@material-ui/lab';

const headCells = [
  { id: 'nombre', label: 'Nombre' },
  { id: 'stock', label: 'Stock' },
  { id: 'pvp', label: 'P.V.P' },
  { id: 'categoria', label: 'Categoria' },
  { id: 'talla', label: 'Talla' },
  { id: 'acciones', label: 'Acciones' },
];
export default function ProductTableSkeleton() {
  const { TblContainer, TblHead } = useTableSkeleton(headCells);

  const TblBody = () => (
    <TableBody>
      {headCells.map((item) => (
        <TableRow key={item.id}>
          <TableCell>
            <Skeleton animation="wave" />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );

  return (
    <Paper style={{ width: '100%' }}>
      <TblContainer>
        <TblHead />
        <TblBody />
      </TblContainer>
    </Paper>
  );
}
