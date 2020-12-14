import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useFormStyles } from '../../styles/makeStyles/forms';
import FormInput from '../forms/FormInput';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import FormSelect from '../forms/FormSelect';
import { SignupSchema } from 'validationSchemas/auth';
import { NEW_USER } from '@/graphql/auth';

let rolOpts = [
  { id: 'ADMINISTRADOR', label: 'ADMINISTRADOR' },
  { id: 'USUARIO', label: 'USUARIO' },
];

export default function EditForm(props) {
  const classes = useFormStyles();
  const router = useRouter();
  const { id, user } = props;
  const [nuevoUsuario] = useMutation(NEW_USER, { variables: { id } });
  const preload = {
    ...user,
  };
  const methods = useForm({
    defaultValues: preload,
    resolver: yupResolver(SignupSchema),
  });

  const { handleSubmit, formState, errors } = methods;
  const { isSubmitting } = formState;

  async function onSubmit(data) {
    const { password, passwordConfirm, nombre, rol, username } = data;
    const input = { nombre, rol, username, password };

    if (password !== passwordConfirm) {
      return Swal.fire('Error', 'Password do not match', 'error');
    }
    try {
      await nuevoUsuario({
        variables: { id, input },
      });

      router.push('/users');
      Swal.fire('Actualizado', 'Usuario editado  correctamente', 'success');
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
            <FormInput
              name="username"
              label="Nombre de Usuario"
              errorobj={errors}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormSelect
              name="rol"
              label="Rol"
              options={rolOpts}
              errorobj={errors}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormInput
              type="password"
              name="password"
              label="Contraseña"
              errorobj={errors}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormInput
              type="password"
              name="passwordConfirm"
              label="Confirmar Contraseña"
              errorobj={errors}
            />
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
          editar
        </Button>
      </form>
    </FormProvider>
  );
}
