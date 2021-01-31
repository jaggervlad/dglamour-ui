import React from 'react';
import FormInput from '../forms/FormInput';
import { FormProvider, useForm } from 'react-hook-form';
import { useFormStyles } from '../../styles/makeStyles/forms';

import { ClientSchema } from 'validationSchemas/clients';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import { ALL_CLIENTS, NEW_CLIENT } from '@/graphql/clients';
import Swal from 'sweetalert2';
import { Grid } from '@material-ui/core';
import Controls from '../controls/Controls';
import { Form } from '../forms/Form';

export default function ClientAddForm({ setOpen }) {
  const classes = useFormStyles();
  const methods = useForm({
    resolver: yupResolver(ClientSchema),
  });
  const [nuevoCliente] = useMutation(NEW_CLIENT, {
    update(cache, { data: nuevoCliente }) {
      const { obtenerClientes } = cache.readQuery({
        query: ALL_CLIENTS,
      });

      cache.writeQuery({
        query: ALL_CLIENTS,
        data: {
          obtenerClientes: [...obtenerClientes, nuevoCliente],
        },
      });
    },
  });
  const { handleSubmit, formState, errors } = methods;
  const { isSubmitting } = formState;

  async function onSubmit(data) {
    const input = {
      telefono: +data.telefono,
      ...data,
    };

    try {
      await nuevoCliente({
        variables: { input },
      });

      setOpen(false);
      Swal.fire('Creado', 'Se creó cliente correctamente', 'success');
    } catch (error) {
      const errorMsg = error.message.replace('Graphql error:', '');
      Swal.fire('Error', errorMsg, 'error');
    }
  }
  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)} claseName={classes.form}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FormInput
              name="nombre"
              label="Nombre Completo"
              errorobj={errors}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormInput name="cedula" label="Nº Cédula" errorobj={errors} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput name="telefono" label="Nº Celular" errorobj={errors} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormInput name="mail" label="Correo" errorobj={errors} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput name="ciudad" label="Ciudad" errorobj={errors} />
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
