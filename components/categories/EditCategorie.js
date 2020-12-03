import React from 'react';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import { useFormStyles } from '../../styles/makeStyles/forms';
import FormInput from '../forms/FormInput';
import { FormProvider, useForm } from 'react-hook-form';
import { CategorieSchema } from 'validationSchemas/categories';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CATEGORIE, UPDATE_CATEGORIE } from '@/graphql/categories';
import Swal from 'sweetalert2';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Edit(props) {
  const { open, handleClose, id } = props;
  const [actualizarCategoria] = useMutation(UPDATE_CATEGORIE);
  const { data, loading, error } = useQuery(GET_CATEGORIE, {
    variables: { id },
  });

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;

  return (
    <>
      {data.obtenerCategoria && (
        <EditCategorie
          open={open}
          handleClose={handleClose}
          id={id}
          actualizarCategoria={actualizarCategoria}
          categoria={data.obtenerCategoria}
        />
      )}
    </>
  );
}

function EditCategorie(props) {
  const { open, handleClose, id, actualizarCategoria, categoria } = props;
  const classes = useFormStyles();
  const methods = useForm({
    defaultValues: {
      nombre: categoria.nombre,
    },
    resolver: yupResolver(CategorieSchema),
  });

  async function onSubmit(data) {
    const input = {
      ...data,
    };

    try {
      await actualizarCategoria({
        variables: { id, input },
      });

      handleClose();
    } catch (error) {
      const errorMsg = error.message.replace('Graphql error:', '');
      Swal.fire('Error', errorMsg, 'error');
    }
  }
  const { handleSubmit, formState, errors } = methods;
  const { isSubmitting } = formState;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Editar</DialogTitle>
      <DialogContent>
        <DialogContentText>Editar Categoria</DialogContentText>

        <FormProvider {...methods}>
          <form className={classes.form}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <FormInput name="nombre" label="Nombre" errorobj={errors} />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancelar
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                color="primary"
                disabled={isSubmitting}
              >
                Actualizar
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
