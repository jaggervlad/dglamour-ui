import * as Yup from 'yup';

export const ClientSchema = Yup.object().shape({
  cedula: Yup.string().required('Este campo es obligatorio'),
  nombre: Yup.string().required('Este campo es obligatorio'),
  mail: Yup.string()
    .email('Email no válido')
    .required('Este campo es obligatorio'),
  telefono: Yup.number().required('Digite un numero de telefono valido'),
  direccion: Yup.string().required('Este campo es obligatorio'),
  ciudad: Yup.string().required('Este campo es obligatorio'),
});
