import React from 'react';
import FormInput from '../forms/FormInput';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { Grid } from '@material-ui/core';
import Controls from '../controls/Controls';
import { Form } from '../forms/Form';

export default function ConceptAddForm({ setOpen }) {
  const methods = useForm({});
  const { handleSubmit, formState, errors } = methods;
  const { isSubmitting } = formState;

  async function onSubmit(data) {
    console.log(data);
    setOpen(false);
    // try {
    //   setOpen(false);
    //   Swal.fire('Creado', 'Se creó cliente correctamente', 'success');
    // } catch (error) {
    //   const errorMsg = error.message.replace('Graphql error:', '');
    //   Swal.fire('Error', errorMsg, 'error');
    // }
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

        <Controls.Button disabled={isSubmitting} type="submit" text="crear" />
      </Form>
    </FormProvider>
  );
}
