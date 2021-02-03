import React from 'react';
import Grid from '@material-ui/core/Grid';
import Swal from 'sweetalert2';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import FormInput from '../forms/FormInput';
import { Form } from '../forms/Form';
import Controls from '../controls/Controls';
import { UPDATE_PROVIDER } from '@/graphql/providers';
import { useMutation } from '@apollo/client';

export default function ProviderEditForm({ setOpen, provider, id }) {
  const [updateProvider] = useMutation(UPDATE_PROVIDER);
  const preload = {
    ...provider,
  };
  const methods = useForm({
    defaultValues: preload,
  });

  const { handleSubmit, formState, errors } = methods;
  const { isSubmitting } = formState;

  async function onSubmit(data) {
    console.log(data);
    const input = { ...data };

    try {
      await updateProvider({
        variables: { id, input },
      });

      setOpen(false);
      Swal.fire({
        title: 'Actualizado',
        text: 'Editado correctamente',
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
          <Grid item xs={12} sm={6}>
            <FormInput
              name="nombre"
              label="Nombre o Razón Social"
              errorobj={errors}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormInput name="ruc" label="Nº R.U.C" errorobj={errors} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput name="telefono" label="Nº Celular" errorobj={errors} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormInput
              name="contacto"
              label="Persona de Contacto"
              errorobj={errors}
            />
          </Grid>

          <Grid item xs={12}>
            <FormInput name="direccion" label="Direccion" errorobj={errors} />
          </Grid>
        </Grid>

        <Controls.Button
          disabled={isSubmitting}
          type="submit"
          text="guardar cambios"
        />
      </Form>
    </FormProvider>
  );
}
