import * as yup from 'yup';

const REQUIRED = 'Este campo es obligatorio';

export const SignupSchema = yup.object().shape({
  nombre: yup.string().required(REQUIRED),
  username: yup.string().required(REQUIRED),
  rol: yup.string().required(REQUIRED),
  password: yup.string().min(6).max(20).required(REQUIRED),
  passwordConfirm: yup.string().min(6).max(20).required(REQUIRED),
});

export const SigninSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Minimo 3 caracteres')
    .max(20, 'Maximo 20 caracteres')
    .required('El nombre de usuario es obligatorio'),
  password: yup
    .string()
    .min(3, 'Minimo 3 caracteres')
    .max(20, 'Maximo 20 caracteres')
    .required('La contraseña es obligatoria'),
});
