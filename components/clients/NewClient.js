import React from 'react';
import Grid from '@material-ui/core/Grid';
import AuthLayout from '../layout/AuthLayout';
import { Title } from '../customs/Title';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { useFormStyles } from '../../styles/makeStyles/forms';
import FormInput from '../forms/FormInput';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { ClientSchema } from 'validationSchemas/clients';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import { ALL_CLIENTS, NEW_CLIENT } from '@/graphql/clients';
import Swal from 'sweetalert2';

export default function NewClient() {
  const router = useRouter();
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

      router.push('/clients');
      Swal.fire('Creado', 'Se creó cliente correctamente', 'success');
    } catch (error) {
      const errorMsg = error.message.replace('Graphql error:', '');
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
              onClick={() => router.push('/products')}
            >
              <ArrowBackIcon />
            </Button>
          </Grid>
        </Grid>

        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Title>Nuevo Cliente</Title>

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
                      name="cedula"
                      label="Nº Cedula"
                      errorobj={errors}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormInput
                      name="telefono"
                      label="Nº Telefono"
                      errorobj={errors}
                    />
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
                    <FormInput
                      name="direccion"
                      label="Direccion"
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
