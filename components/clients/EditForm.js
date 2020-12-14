import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useFormStyles } from '../../styles/makeStyles/forms';
import FormInput from '../forms/FormInput';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UPDATE_CLIENT } from '@/graphql/clients';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { ClientSchema } from 'validationSchemas/clients';

export default function EditForm(props) {
  const classes = useFormStyles();
  const router = useRouter();
  const { id, client } = props;
  const [actualizarCliente] = useMutation(UPDATE_CLIENT);
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
    const input = { telefono: parseInt(data.telefono), ...data };

    try {
      await actualizarCliente({
        variables: { id, input },
      });

      router.push('/clients');
      Swal.fire('Actualizado', 'Cliente editado correctamente', 'success');
    } catch (error) {
      const errorMsg = error.message.replace('Graphql error:', '');
      Swal.fire('Error', errorMsg, 'error');
    }
  }

  return (
    <FormProvider {...methods}>
      <form className={classes.form}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FormInput
              name="nombre"
              label="Nombre Completo"
              errorobj={errors}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormInput name="cedula" label="Nº Cedula" errorobj={errors} />
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

        <Button
          disabled={isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit(onSubmit)}
        >
          guardar cambios
        </Button>
      </form>
    </FormProvider>
  );
}
