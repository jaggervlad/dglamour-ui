import * as Yup from 'yup';

export const conceptSchema = Yup.object().shape({
  descripcion: Yup.string().required('Por favor ingresé una descripción.'),
  codigo: Yup.number()
    .typeError('Ingresa un valor válido')
    .integer('Ingresé un valor válido')
    .positive('Ingresé un valor válido')
    .required('Por favor ingrese el código.'),
});
