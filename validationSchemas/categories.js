import * as Yup from 'yup';

export const CategorieSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre es obligatorio.'),
});
