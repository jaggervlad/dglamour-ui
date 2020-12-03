import React from 'react';
import { StyledTableCell } from '../table/StyledTableCell';
import { StyledTableRow } from '../table/StyledTableRow';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Swal from 'sweetalert2';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { ALL_CATEGORIES, DELETE_CATEGORIE } from '@/graphql/categories';
import Edit from './EditCategorie';

export default function BodyTable({ categorie }) {
  const { id, nombre } = categorie;
  const [open, setOpen] = React.useState(false);
  const [eliminarCategoria] = useMutation(DELETE_CATEGORIE, {
    update(cache) {
      const { obtenerCategorias } = cache.readQuery({ query: ALL_CATEGORIES });

      cache.writeQuery({
        query: ALL_CATEGORIES,
        data: {
          obtenerCategorias: obtenerCategorias.filter(
            (current) => current.id !== id
          ),
        },
      });
    },
  });

  function handleDelete() {
    Swal.fire({
      title: 'Deseas eliminar esta categoria?',
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
          await eliminarCategoria({ variables: { id } });
          Swal.fire('Correcto', 'Categoria eliminada', 'success');
        } catch (error) {
          const errorMessage = error.message.replace('Graphql error: ', '');
          Swal.fire('Error', errorMessage, 'error');
        }
      }
    });
  }

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  return (
    <StyledTableRow>
      <StyledTableCell>{nombre}</StyledTableCell>
      <StyledTableCell align="center">
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          <DeleteIcon />
        </Button>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Button variant="contained" color="primary" onClick={handleOpen}>
          <EditIcon />
        </Button>

        <Edit id={id} open={open} handleClose={handleClose} />
      </StyledTableCell>
    </StyledTableRow>
  );
}
