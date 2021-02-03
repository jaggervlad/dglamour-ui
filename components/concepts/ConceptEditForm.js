import React from 'react';
import Grid from '@material-ui/core/Grid';
import Swal from 'sweetalert2';
import { FormProvider, useForm } from 'react-hook-form';

import FormInput from '../forms/FormInput';
import { Form } from '../forms/Form';
import Controls from '../controls/Controls';
import { useMutation } from '@apollo/client';
import { UPDATE_CONCEPT } from '@/graphql/concepts';

export default function ConceptEditForm(props) {
  const [updateConcept] = useMutation(UPDATE_CONCEPT);
  const { id, concept, setOpen } = props;
  const preload = {
    ...concept,
  };
  const methods = useForm({
    defaultValues: preload,
  });

  const { handleSubmit, formState, errors } = methods;
  const { isSubmitting } = formState;

  async function onSubmit(data) {
    const input = {
      ...data,
    };
    try {
      await updateConcept({
        variables: { id, input },
      });

      setOpen(false);
      Swal.fire({
        title: 'Actualizado',
        text: 'Se edito correctamente',
        icon: 'success',
        timer: 1500,
      });
    } catch (error) {
      setOpen(false);
      const errorMsg = error.message.replace('Graphql error:', '');
      Swal.fire({
        title: 'Error',
        text: errorMsg,
        icon: 'error',
        timer: 1500,
      });
    }
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FormInput
              name="nombre"
              label="Nombre o Descripción"
              errorobj={errors}
            />
          </Grid>
        </Grid>

        <Controls.Button
          disabled={isSubmitting}
          text="guardar cambios"
          type="submit"
        />
      </Form>
    </FormProvider>
  );
}
