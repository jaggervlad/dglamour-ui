import React from 'react';
import useTable from '../table/useTable';
import { Paper, TableBody, TableCell, TableRow } from '@material-ui/core';
import UserEditButton from './UserEditButton';

const headCells = [
  { id: 'nombre', label: 'Nombre', disableSorting: true },
  { id: 'username', label: 'Usuario', disableSorting: true },
  { id: 'rol', label: 'Rol', disableSorting: true },
  { id: 'acciones', label: 'Acciones', disableSorting: true },
];
export default function UserTable({ users, filterFn }) {
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagination,
    EmptyRows,
  } = useTable(users, headCells, filterFn);

  const TblBody = (props) => (
    <TableBody>
      {recordsAfterPagination().map((item) => (
        <TableRow key={item.id}>
          <TableCell>{item.nombre}</TableCell>
          <TableCell align="center">@{item.username}</TableCell>
          <TableCell align="center">{item.rol}</TableCell>
          <TableCell align="center">
            <UserEditButton id={item.id} />
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
