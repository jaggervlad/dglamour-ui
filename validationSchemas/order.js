import * as Yup from 'yup';

export const OrderSchema = Yup.object().shape({
  direccion: Yup.string().required('Este campo es obligatorio'),
});

export const PaySchema = Yup.object().shape({
  pago: Yup.string().required('Este campo es obligatorio'),
  descripcion: Yup.string(),
});
