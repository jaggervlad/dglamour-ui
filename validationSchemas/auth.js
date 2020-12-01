import * as yup from 'yup';

export const SignupSchema = yup.object().shape({
  email: yup.string().email().required('This input is required'),
  password: yup.string().min(6).max(20).required('This input is required'),
  passwordConfirm: yup
    .string()
    .min(6)
    .max(20)
    .required('This input is required'),
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
