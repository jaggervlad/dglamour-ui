import Swal from 'sweetalert2';

export const handleShippingOrder = (id, e) => {
  e.preventDefault();
  fetch(`https://blooming-citadel-99802.herokuapp.com/pedidos/envios/${id}`, {
    method: 'GET',
  })
    .then((res) => res.blob())
    .then((blob) => {
      if (typeof window !== 'undefined') {
        const urlFile = URL.createObjectURL(blob);
        window.open(urlFile);
      }
    })
    .catch((error) =>
      Swal.fire('Error!', 'No se ha podido crear el PDF', 'error')
    );
};

export const handlePdf = (id, e) => {
  e.preventDefault();
  fetch(`https://blooming-citadel-99802.herokuapp.com/pedidos/htmlPdf/${id}`, {
    method: 'GET',
  })
    .then((res) => res.blob())
    .then((blob) => {
      if (typeof window !== 'undefined') {
        const urlFile = URL.createObjectURL(blob);
        window.open(urlFile);
      }
    })
    .catch((error) =>
      Swal.fire('Error!', 'No se ha podido crear el PDF', 'error')
    );
};
