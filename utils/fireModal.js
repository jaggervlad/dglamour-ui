import Swal from 'sweetalert2';

export function fireErrorModal(message) {
  return Swal.fire({
    title: 'Error',
    text: message,
    icon: 'error',
    timer: 3000,
  });
}

export function fireCreateModal() {
  return Swal.fire({
    title: 'Creado',
    text: 'Se creó  correctamente.',
    icon: 'success',
    timer: 1500,
  });
}

export function fireDeleteModal() {
  return Swal.fire({
    title: 'Correcto',
    text: 'Eliminado',
    icon: 'success',
    timer: 1500,
  });
}

export function fireEditModal() {
  return Swal.fire({
    title: 'Actualizado',
    text: 'Se edito correctamente.',
    icon: 'success',
    timer: 1500,
  });
}

export function fireHandleDeleteModal() {
  return Swal.fire({
    title: 'Estas seguro?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Eliminar',
    cancelButtonText: 'No, Cancelar',
  });
}
