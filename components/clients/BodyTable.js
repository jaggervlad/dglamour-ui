import React from 'react';
import { StyledTableCell } from '../table/StyledTableCell';
import { StyledTableRow } from '../table/StyledTableRow';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Swal from 'sweetalert2';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { ALL_CLIENTS, DELETE_CLIENT } from '@/graphql/clients';

export default function BodyTable({ client }) {
  const { id, cedula, nombre, mail, telefono } = client;
  const [eliminarProducto] = useMutation(DELETE_CLIENT, {
    update(cache) {
      const { obtenerClientes } = cache.readQuery({ query: ALL_CLIENTS });

      cache.writeQuery({
        query: ALL_CLIENTS,
        data: {
          obtenerClientes: obtenerClientes.filter(
            (current) => current.id !== id
          ),
        },
      });
    },
  });

  function handleDelete() {
    Swal.fire({
      title: 'Deseas eliminar este cliente?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await eliminarProducto({ variables: { id } });
          Swal.fire('Correct', 'Cliente eliminado', 'success');
        } catch (error) {
          const errorMessage = error.message.replace('Graphql error: ', '');
          Swal.fire('Error', errorMessage, 'error');
        }
      }
    });
  }
  return (
    <StyledTableRow>
      <StyledTableCell>{nombre}</StyledTableCell>
      <StyledTableCell align="center">{cedula} </StyledTableCell>
      <StyledTableCell align="center">0{telefono}</StyledTableCell>
      <StyledTableCell align="center"> {mail}</StyledTableCell>
      <StyledTableCell align="center">
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          <DeleteIcon />
        </Button>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Link href="/editclient/[id]" as={`/editclient/${id}`}>
          <Button variant="contained" color="primary">
            <EditIcon />
          </Button>
        </Link>
      </StyledTableCell>
    </StyledTableRow>
  );
}
