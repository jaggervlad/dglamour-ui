import * as yup from 'yup';

const REQUIRED_MSG = 'Este campo es obligatorio';

export const ProductSchema = yup.object().shape({
  nombre: yup.string().max(50).required(REQUIRED_MSG),
  existencia: yup
    .number('')
    .integer('Solo numero enteros')
    .required(REQUIRED_MSG),
  precio: yup.number().required(REQUIRED_MSG),
  marca: yup.string().max(50).required(REQUIRED_MSG),
  undMed: yup.string().max(50).required(REQUIRED_MSG),
  presentacion: yup.string().max(50).required(REQUIRED_MSG),
  categoria: yup.string().required(REQUIRED_MSG),
});
