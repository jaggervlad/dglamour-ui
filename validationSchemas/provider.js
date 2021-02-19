import * as Yup from 'yup';

export const providerSchema = Yup.object().shape({
  ruc: Yup.string()
    .typeError('Ingresa un valor válido')
    .matches(/^[0-9]{13}$/, 'Por favor ingresa un numero de RUC válido')
    .required('Por favor ingrese el código.'),
  telefono: Yup.string()
    .typeError('Ingresa un valor válido')
    .matches(/^[0-9]{9}$/, 'Por favor ingresa un numero de teléfono válido')
    .required('Por favor ingrese el teléfono.'),
  nombre: Yup.string().required('Por favor ingresé el nombre.'),
  direccion: Yup.string().required('Por favor ingresé la dirección.'),
  contacto: Yup.string().required('Por favor ingresé el contacto.'),
});
