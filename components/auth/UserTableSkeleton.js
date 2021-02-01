import React from 'react';
import useTableSkeleton from '../table/useTableSkeleton';
import { Paper, TableBody, TableCell, TableRow } from '@material-ui/core';

import { Skeleton } from '@material-ui/lab';

const headCells = [
  { id: 'nombre', label: 'Nombre' },
  { id: 'username', label: 'Usuario' },
  { id: 'rol', label: 'Rol' },
  { id: 'acciones', label: 'Acciones' },
];
export default function UserTableSkeleton() {
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
