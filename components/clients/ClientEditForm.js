import React from 'react';
import Grid from '@material-ui/core/Grid';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import FormInput from '../forms/FormInput';
import { ClientSchema } from 'validationSchemas/clients';
import { Form } from '../forms/Form';
import Controls from '../controls/Controls';
import { fireCreateModal, fireErrorModal } from '@/utils/fireModal';

export default function ClientEditForm(props) {
  const { id, client, setOpen, updateClient } = props;
  const preload = {
    ...client,
  };
  const methods = useForm({
    defaultValues: preload,
    resolver: yupResolver(ClientSchema),
  });

  const { handleSubmit, formState, errors } = methods;
  const { isSubmitting } = formState;

  async function onSubmit(data) {
    const input = { ...data };

    try {
      await updateClient({
        variables: { id, input },
      });

      setOpen(false);
      fireCreateModal();
    } catch (error) {
      setOpen(false);
      const errorMsg = error.message.replace('Graphql error:', '');
      fireErrorModal(errorMsg);
    }
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
            <FormInput name="telefono" label="Nº Telefono" errorobj={errors} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormInput
              name="mail"
              label="Correo Electronico"
              errorobj={errors}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput name="ciudad" label="Ciudad" errorobj={errors} />
          </Grid>

          <Grid item xs={12}>
            <FormInput name="direccion" label="Direccion" errorobj={errors} />
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
