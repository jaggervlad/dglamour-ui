import * as yup from 'yup';

const REQUIRED_MSG = 'Este campo es obligatorio.';
const VALID_MESSAGE = 'Ingresé un valor valido.';

export const ProductSchema = yup.object().shape({
  nombre: yup.string().max(100).required(REQUIRED_MSG),
  existencia: yup
    .number()
    .typeError('Ingresé un valor válido.')
    .integer(VALID_MESSAGE)
    .positive(VALID_MESSAGE)
    .required(REQUIRED_MSG),
  precio: yup
    .number()
    .typeError('Ingresé un valor válido.')
    .positive(VALID_MESSAGE)
    .required(REQUIRED_MSG),
  marca: yup.string().required(REQUIRED_MSG),
  undMed: yup.string().required(REQUIRED_MSG),
  presentacion: yup.string().required(REQUIRED_MSG),
  categoria: yup.string().required(REQUIRED_MSG),
});
