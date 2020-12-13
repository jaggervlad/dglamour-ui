import React from 'react';
import { StyledTableCell } from '../table/StyledTableCell';
import { StyledTableRow } from '../table/StyledTableRow';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { useStatusChange } from '@/hooks/useStatusChange';
import StatusChange from './StatusChange';
import { useMutation } from '@apollo/client';
import { ALL_ORDERS, DELETE_ORDER } from '@/graphql/orders';
import { handlePdf } from '@/utils/events/pdf';
import { useDeleteOrder } from '@/hooks/useDeleteOrder';

export default function BodyTable({ order }) {
  const products = order.pedido.map(({ __typename, ...product }) => product);
  const { id, total, cliente, estado, direccion } = order;
  const { nombre } = cliente;
  const { setStatus, status } = useStatusChange(estado);
  const { handleDelete } = useDeleteOrder(id);
  return (
    <StyledTableRow>
      <StyledTableCell>{id.slice(5, 10)}</StyledTableCell>
      <StyledTableCell align="center">{nombre} </StyledTableCell>
      <StyledTableCell align="center">{direccion}</StyledTableCell>
      <StyledTableCell align="center"> {total.toFixed(2)}</StyledTableCell>
      <StyledTableCell align="center">
        <StatusChange
          id={id}
          status={status}
          setStatus={setStatus}
          client={cliente}
          products={products}
        />
      </StyledTableCell>

      {/* Ver */}
      <StyledTableCell align="center">
        <Link href="/seeorder/[id]" as={`/seeorder/${id}`}>
          <Button variant="contained" color="primary">
            <VisibilityIcon />
          </Button>
        </Link>
      </StyledTableCell>

      {/* Editar  */}
      <StyledTableCell align="center">
        <Link href="/editorder/[id]" as={`/editorder/${id}`}>
          <Button variant="contained">
            <EditIcon />
          </Button>
        </Link>
      </StyledTableCell>

      {/* Generar Pdf */}
      <StyledTableCell align="center">
        <Button
          variant="contained"
          color="primary.secondary"
          onClick={(e) => handlePdf(id, e)}
        >
          <PrintIcon />
        </Button>
      </StyledTableCell>

      <StyledTableCell align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={(e) => handleDelete(e)}
        >
          <DeleteIcon />
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  );
}
