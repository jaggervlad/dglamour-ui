import { ALL_CATEGORIES, NEW_CATEGORIE } from '@/graphql/categories';
import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@material-ui/core';
import { FormProvider, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { CategorieSchema } from 'validationSchemas/categories';
import Controls from '../controls/Controls';
import { Form } from '../forms/Form';
import FormInput from '../forms/FormInput';

export function CategorieAddForm(props) {
  const { setOpen } = props;
  const methods = useForm({
    resolver: yupResolver(CategorieSchema),
  });
  const [nuevaCategoria] = useMutation(NEW_CATEGORIE, {
    update(cache, { data: nuevaCategoria }) {
      const { obtenerCategorias } = cache.readQuery({
        query: ALL_CATEGORIES,
      });

      cache.writeQuery({
        query: ALL_CATEGORIES,
        data: {
          obtenerCategorias: [...obtenerCategorias, nuevaCategoria],
        },
      });
    },
  });

  async function onSubmit(data) {
    const input = {
      ...data,
    };

    try {
      await nuevaCategoria({
        variables: { input },
      });

      setOpen(false);
    } catch (error) {
      const errorMsg = error.message.replace('Graphql error:', '');
      Swal.fire('Error', errorMsg, 'error');
    }
  }
  const { handleSubmit, formState, errors } = methods;
  const { isSubmitting } = formState;
  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12}>
            <FormInput name="nombre" label="Nombre" errorobj={errors} />
          </Grid>
        </Grid>

        <Controls.Button text="crear" type="submit" disabled={isSubmitting} />
      </Form>
    </FormProvider>
  );
}
