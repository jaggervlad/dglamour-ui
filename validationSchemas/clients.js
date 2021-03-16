import * as Yup from 'yup';

export const ClientSchema = Yup.object().shape({
  cedula: Yup.string()
    .typeError('Ingresé un valor válido')
    .matches(/[0-9]{8,10}/, 'Ingresé un numero de cédula válido')
    .required('La cédula es obligatorio.'),
  nombre: Yup.string().required('El nombre es obligatorio.'),
  mail: Yup.string()
    .email('Email no válido.')
    .required('El email es obligatorio.'),
  telefono: Yup.number()
    .typeError('Ingresé un valor válido')
    .integer()
    .positive('Digite un número de teléfono valido.')
    .max(999999999, 'Ingresé un número de teléfono válido')
    .required('El número de teléfono es obligatorio.'),
  direccion: Yup.string().required('La dirección es obligatoria.'),
  ciudad: Yup.string().required('La ciudad es obligatoria.'),
});
