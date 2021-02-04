import React from 'react';
import FormInput from '../forms/FormInput';
import { FormProvider, useForm } from 'react-hook-form';

import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { Grid } from '@material-ui/core';
import Controls from '../controls/Controls';
import { Form } from '../forms/Form';
import { ALL_CONCEPTS, NEW_CONCEPT } from '@/graphql/concepts';

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
  const methods = useForm();
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
