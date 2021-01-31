import React from 'react';

// Components
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Copyright } from '../customs/Copyright';
import Swal from 'sweetalert2';

// Fetch a Mutate data
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';
import { LOGIN } from '@/graphql/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { SigninSchema } from '../../validationSchemas/auth';
import FormInput from '../forms/FormInput';
import ErrorInput from '../forms/ErrorInput';
import { useFormStyles } from '../../styles/makeStyles/forms';
import { setAccessToken } from '@/utils/accessToken';

export default function SignIn() {
  const router = useRouter();
  const [autenticarUsuario] = useMutation(LOGIN);
  const methods = useForm({
    resolver: yupResolver(SigninSchema),
  });
  const { handleSubmit, formState, errors } = methods;
  const { isSubmitting } = formState;
  const classes = useFormStyles();

  async function onSubmit(data) {
    const { username, password } = data;
    try {
      const { data } = await autenticarUsuario({
        variables: {
          input: {
            username,
            password,
          },
        },
      });

      const { token } = data.autenticarUsuario;
      setAccessToken(token);
      // localStorage.setItem('token', token);
      await router.push('/profile');
    } catch (error) {
      const errorMsg = error.message.replace('Graphql error: ', '');
      Swal.fire('Error', errorMsg, 'error');
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={`${classes.paper} ${classes.marginTop}`}>
        <Typography component="h1" variant="h5">
          Inicia Sesión
        </Typography>

        <FormProvider {...methods}>
          <form className={classes.form}>
            <FormInput name="username" label="Usuario" />
            <ErrorInput errors={errors} name={'username'} />

            <FormInput name="password" label="Contraseña" type="password" />
            <ErrorInput errors={errors} name={'password'} />

            <Button
              disabled={isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit(onSubmit)}
            >
              ingresar
            </Button>
          </form>
        </FormProvider>
      </div>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
