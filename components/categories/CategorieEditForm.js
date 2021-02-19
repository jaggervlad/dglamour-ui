import React from 'react';
import Grid from '@material-ui/core/Grid';

import FormInput from '../forms/FormInput';
import { FormProvider, useForm } from 'react-hook-form';
import { CategorieSchema } from 'validationSchemas/categories';
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';

import { Form } from '../forms/Form';
import Controls from '../controls/Controls';
import {
  fireDeleteModal,
  fireEditModal,
  fireErrorModal,
} from '@/utils/fireModal';

export default function EditForm(props) {
  const { setOpen, id, actualizarCategoria, categoria } = props;
  const methods = useForm({
    defaultValues: {
      nombre: categoria.nombre,
    },
    resolver: yupResolver(CategorieSchema),
  });

  async function onSubmit(data) {
    const input = {
      ...data,
    };

    try {
      await actualizarCategoria({
        variables: { id, input },
      });

      fireEditModal();
      setOpen(false);
    } catch (error) {
      const errorMsg = error.message.replace('Graphql error:', '');
      fireErrorModal(errorMsg);
    }
  }
  const { handleSubmit, formState, errors } = methods;
  const { isSubmitting } = formState;

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FormInput name="nombre" label="Nombre" errorobj={errors} />
          </Grid>
        </Grid>

        <div>
          <Controls.Button
            text="guardar cambios"
            type="submit"
            disabled={isSubmitting}
          />
        </div>
      </Form>
    </FormProvider>
  );
}
