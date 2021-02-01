import { ALL_USERS, NEW_USER } from '@/graphql/auth';
import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { SignupSchema } from 'validationSchemas/auth';
import { Form } from '../forms/Form';
import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';

let rolOpts = [
  { id: 'ADMINISTRADOR', label: 'ADMINISTRADOR' },
  { id: 'USUARIO', label: 'USUARIO' },
];
export default function UserAddForm({ setOpen }) {
  const [nuevoUsuario] = useMutation(NEW_USER, {
    update(cache, { data: nuevoUsuario }) {
      const { obtenerUsuarios } = cache.readQuery({ query: ALL_USERS });

      cache.writeQuery({
        query: ALL_USERS,
        data: {
          obtenerUsuarios: [...obtenerUsuarios, nuevoUsuario],
        },
      });
    },
  });
  const methods = useForm({
    resolver: yupResolver(SignupSchema),
  });
  const { handleSubmit, formState, errors } = methods;
  const { isSubmitting } = formState;

  async function onSubmit(data) {
    const { username, password, passwordConfirm, nombre, rol } = data;

    if (password !== passwordConfirm) {
      return Swal.fire('Error', 'Password do not match', 'error');
    }

    try {
      await nuevoUsuario({
        variables: {
          input: {
            nombre,
            username,
            password,
            rol,
          },
        },
      });

      setOpen(false);
    } catch (error) {
      setOpen(false);
      const errorMsg = error.message.replace('Graphql error: ', '');
      Swal.fire('Error', errorMsg, 'error');
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
        >
          crear
        </Button>
      </Form>
    </FormProvider>
  );
}
