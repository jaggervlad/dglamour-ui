import React from 'react';
import FormInput from '../forms/FormInput';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { Grid } from '@material-ui/core';
import Controls from '../controls/Controls';
import { Form } from '../forms/Form';
import { ALL_PROVIDER, NEW_PROVIDER } from '@/graphql/providers';

export default function ProviderAddForm({ setOpen }) {
  const methods = useForm({});
  const [addProvider] = useMutation(NEW_PROVIDER, {
    update(cache, { data: addProvider }) {
      const { allProviders } = cache.readQuery({
        query: ALL_PROVIDER,
      });

      cache.writeQuery({
        query: ALL_PROVIDER,
        data: {
          allProviders: [...allProviders, addProvider],
        },
      });
    },
  });
  const { handleSubmit, formState, errors } = methods;
  const { isSubmitting } = formState;

  async function onSubmit(data) {
    console.log(data);
    const input = {
      ...data,
    };
    console.log(input);

    try {
      await addProvider({
        variables: { input },
      });

      setOpen(false);
      Swal.fire({
        title: 'Creado',
        text: 'Se creó  correctamente',
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

        <Controls.Button disabled={isSubmitting} type="submit" text="crear" />
      </Form>
    </FormProvider>
  );
}
