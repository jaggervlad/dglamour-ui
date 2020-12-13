import React from 'react';
import { StyledTableCell } from '../table/StyledTableCell';
import { StyledTableRow } from '../table/StyledTableRow';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Link from 'next/link';

export default function BodyTablePaid({ order }) {
  const { id, total, cliente, estado, direccion } = order;
  const { nombre } = cliente;

  return (
    <StyledTableRow>
      <StyledTableCell>{id.slice(5, 10)}</StyledTableCell>
      <StyledTableCell align="center">{nombre} </StyledTableCell>
      <StyledTableCell align="center">{direccion}</StyledTableCell>
      <StyledTableCell align="center"> {total.toFixed(2)}</StyledTableCell>
      <StyledTableCell align="center">{estado}</StyledTableCell>

      {/* Ver */}
      <StyledTableCell align="center">
        <Link href="/seeorder/[id]" as={`/seeorder/${id}`}>
          <Button variant="contained" color="primary">
            <VisibilityIcon />
          </Button>
        </Link>
      </StyledTableCell>
    </StyledTableRow>
  );
}
