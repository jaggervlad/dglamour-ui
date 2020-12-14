import React from 'react';
import { StyledTableCell } from '../table/StyledTableCell';
import { StyledTableRow } from '../table/StyledTableRow';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Link from 'next/link';

export default function BodyTable({ user }) {
  const { id, nombre, username } = user;

  return (
    <StyledTableRow>
      <StyledTableCell>{nombre}</StyledTableCell>
      <StyledTableCell align="center">@{username}</StyledTableCell>

      <StyledTableCell align="center">
        <Link href="/edituser/[id]" as={`/edituser/${id}`}>
          <Button variant="contained" color="primary">
            <EditIcon />
          </Button>
        </Link>
      </StyledTableCell>
    </StyledTableRow>
  );
}
