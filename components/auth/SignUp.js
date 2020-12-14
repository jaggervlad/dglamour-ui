import React from 'react';

// Components
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Swal from 'sweetalert2';

// Fetch a Mutate data
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';
import { ALL_USERS, NEW_USER } from '../../graphql/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignupSchema } from '../../validationSchemas/auth';
import FormInput from '../forms/FormInput';
import { useStyles } from '../../styles/makeStyles/login';
import AuthLayout from '../layout/AuthLayout';
import { ArrowBack } from '@material-ui/icons';
import { Title } from '../customs/Title';
import FormSelect from '../forms/FormSelect';

let rolOpts = [
  { id: 'ADMINISTRADOR', label: 'ADMINISTRADOR' },
  { id: 'USUARIO', label: 'USUARIO' },
];

export default function SignUp() {
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
  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(SignupSchema),
  });
  const { handleSubmit, formState, errors } = methods;
  const { isSubmitting } = formState;
  const classes = useStyles();

  async function onSubmit(data) {
    const { username, password, passwordConfirm, nombre, rol } = data;
    console.log(data);

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

      router.push('/users');
    } catch (error) {
      const errorMsg = error.message.replace('Graphql error: ', '');
      Swal.fire('Error', errorMsg, 'error');
    }
  }

  return (
    <AuthLayout>
      <Grid item container xs={12} md={8} lg={12}>
        <Grid
          item
          container
          spacing={4}
          alignItems="center"
          justify="space-between"
        >
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: '5px' }}
              onClick={() => router.push('/users')}
            >
              <ArrowBack />
            </Button>
          </Grid>
        </Grid>

        <Container component="main" maxWidth="xs">
          <div>
            <Title>Nuevo Usuario</Title>

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
                  crear
                </Button>
              </form>
            </FormProvider>
          </div>
        </Container>
      </Grid>
    </AuthLayout>
  );
}
