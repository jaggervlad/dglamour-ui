import React from 'react';
import Grid from '@material-ui/core/Grid';
import { FormProvider, useForm } from 'react-hook-form';

import FormInput from '../forms/FormInput';
import { Form } from '../forms/Form';
import Controls from '../controls/Controls';
import { useMutation } from '@apollo/client';
import { UPDATE_CONCEPT } from '@/graphql/concepts';
import { yupResolver } from '@hookform/resolvers/yup';
import { conceptSchema } from 'validationSchemas/concept';
import { fireEditModal, fireErrorModal } from '@/utils/fireModal';

export default function ConceptEditForm(props) {
  const [updateConcept] = useMutation(UPDATE_CONCEPT);
  const { id, concept, setOpen } = props;
  const preload = {
    ...concept,
  };
  const methods = useForm({
    defaultValues: preload,
    resolver: yupResolver(conceptSchema),
  });

  const { handleSubmit, formState, errors } = methods;
  const { isSubmitting } = formState;

  async function onSubmit(data) {
    const input = {
      codigo: +data.codigo,
      descripcion: data.descripcion,
    };
    try {
      await updateConcept({
        variables: { id, input },
      });

      setOpen(false);
      fireEditModal();
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
              type="number"
              name="codigo"
              label="Código Gasto"
              errorobj={errors}
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              name="descripcion"
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
