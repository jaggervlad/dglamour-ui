import React, { useEffect } from 'react';

// Components
import Button from '@material-ui/core/Button';
import Link from '../customs/Links';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Copyright } from '../customs/Copyright';
import Swal from 'sweetalert2';

// Fetch a Mutate data
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';
import { LOGIN, ME } from '@/graphql/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { SigninSchema } from '../../validationSchemas/auth';
import FormInput from '../forms/FormInput';
import ErrorInput from '../forms/ErrorInput';
import { useFormStyles } from '../../styles/makeStyles/forms';

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
      localStorage.setItem('token', token);
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
          Sign in
        </Typography>

        <FormProvider {...methods}>
          <form className={classes.form}>
            <FormInput name="username" label="Username" />
            <ErrorInput errors={errors} name={'username'} />

            <FormInput name="password" label="Password" type="password" />
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
              login
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
