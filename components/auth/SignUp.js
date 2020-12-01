import React from 'react';

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
import { CREATE_USER } from '../../graphql/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignupSchema } from '../../validationSchemas/auth';
import FormInput from '../forms/FormInput';
import ErrorInput from '../forms/ErrorInput';
import { useStyles } from '../../styles/makeStyles/login';

export default function SignUp() {
  const [createUser] = useMutation(CREATE_USER);
  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(SignupSchema),
  });
  const { handleSubmit, formState, errors } = methods;
  const { isSubmitting } = formState;
  const classes = useStyles();

  async function onSubmit(data) {
    const { email, password, passwordConfirm } = data;
    console.log(data);

    if (password !== passwordConfirm) {
      return Swal.fire('Error', 'Password do not match', 'error');
    }

    try {
      await createUser({
        variables: {
          data: {
            email,
            password,
          },
        },
      });

      router.push('/signin');
    } catch (error) {
      const errorMsg = error.message.replace('Graphql error: ', '');
      Swal.fire('Error', errorMsg, 'error');
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

        <FormProvider {...methods}>
          <form className={classes.form}>
            <FormInput name="email" label="Email" type="email" />
            <ErrorInput errors={errors} name={'email'} />

            <FormInput name="password" label="Password" type="password" />
            <ErrorInput errors={errors} name={'password'} />

            <FormInput
              name="passwordConfirm"
              label="Confirm Password"
              type="password"
            />
            <ErrorInput errors={errors} name={'passwordConfirm'} />

            <Button
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              register
            </Button>
          </form>
        </FormProvider>

        <Grid container justify="center">
          <Grid item>
            <Link href="/signin" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </div>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
