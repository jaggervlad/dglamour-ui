import React from 'react';
import FormInput from '../forms/FormInput';
import { FormProvider, useForm } from 'react-hook-form';

import { useMutation } from '@apollo/client';
import { Grid } from '@material-ui/core';
import Controls from '../controls/Controls';
import { Form } from '../forms/Form';
import { ALL_CONCEPTS, NEW_CONCEPT } from '@/graphql/concepts';
import { yupResolver } from '@hookform/resolvers/yup';
import { conceptSchema } from 'validationSchemas/concept';
import { fireCreateModal, fireErrorModal } from '@/utils/fireModal';

export default function ConceptAddForm({ setOpen }) {
  const [addConcept] = useMutation(NEW_CONCEPT, {
    update(cache, { data: addConcept }) {
      const { allConcepts } = cache.readQuery({ query: ALL_CONCEPTS });

      cache.writeQuery({
        query: ALL_CONCEPTS,
        data: {
          allConcepts: [...allConcepts, addConcept],
        },
      });
    },
  });
  const methods = useForm({
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
      await addConcept({ variables: { input } });
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
            <FormInput name="codigo" label="Código Gasto" errorobj={errors} />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              name="descripcion"
              label="Descripción"
              errorobj={errors}
            />
          </Grid>
        </Grid>

        <Controls.Button disabled={isSubmitting} type="submit" text="crear" />
      </Form>
    </FormProvider>
  );
}
