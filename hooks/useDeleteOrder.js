import { ALL_ORDERS, DELETE_ORDER } from '@/graphql/orders';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
export function useDeleteOrderRedirect(id) {
  const router = useRouter();
  const [eliminarPedido] = useMutation(DELETE_ORDER, {
    update(cache) {
      const { obtenerPedidos } = cache.readQuery({ query: ALL_ORDERS });

      cache.writeQuery({
        query: ALL_ORDERS,
        data: {
          obtenerPedidos: obtenerPedidos.filter((ped) => ped.id !== id),
        },
      });
    },
  });

  function handleDelete(e) {
    e.preventDefault();
    Swal.fire({
      title: '¿Deseas eliminar a este pedido?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar',
    }).then(async (result) => {
      if (result.value) {
        try {
          const data = await eliminarPedido({
            variables: {
              id,
            },
          });

          router.push('/orders');
          Swal.fire('Eliminado', data.eliminarPedido, 'success');
        } catch (error) {
          const errorMessage = error.message.replace('Graphql error: ', '');
          Swal.fire('Error', errorMessage, 'error');
        }
      }
    });
  }

  return { handleDelete };
}
export function useDeleteOrder(id) {
  const [eliminarPedido] = useMutation(DELETE_ORDER, {
    update(cache) {
      const { obtenerPedidos } = cache.readQuery({ query: ALL_ORDERS });

      cache.writeQuery({
        query: ALL_ORDERS,
        data: {
          obtenerPedidos: obtenerPedidos.filter((ped) => ped.id !== id),
        },
      });
    },
  });

  function handleDelete() {
    Swal.fire({
      title: '¿Deseas eliminar a este pedido?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar',
    }).then(async (result) => {
      if (result.value) {
        try {
          const data = await eliminarPedido({
            variables: {
              id,
            },
          });

          Swal.fire('Eliminado', data.eliminarPedido, 'success');
        } catch (error) {
          const errorMessage = error.message.replace('Graphql error: ', '');
          Swal.fire('Error', errorMessage, 'error');
        }
      }
    });
  }

  return { handleDelete };
}
