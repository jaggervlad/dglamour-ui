import React from 'react';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import { useFormStyles } from '../../styles/makeStyles/forms';
import FormInput from '../forms/FormInput';
import { FormProvider, useForm } from 'react-hook-form';
import { CategorieSchema } from 'validationSchemas/categories';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import { ALL_CATEGORIES, NEW_CATEGORIE } from '@/graphql/categories';
import Swal from 'sweetalert2';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
export function DialogCategorie(props) {
  const { open, handleClose } = props;
  const classes = useFormStyles();
  const methods = useForm({
    resolver: yupResolver(CategorieSchema),
  });
  const [nuevaCategoria] = useMutation(NEW_CATEGORIE, {
    update(cache, { data: nuevaCategoria }) {
      const { obtenerCategorias } = cache.readQuery({
        query: ALL_CATEGORIES,
      });

      cache.writeQuery({
        query: ALL_CATEGORIES,
        data: {
          obtenerCategorias: [...obtenerCategorias, nuevaCategoria],
        },
      });
    },
  });

  async function onSubmit(data) {
    const input = {
      ...data,
    };

    try {
      await nuevaCategoria({
        variables: { input },
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
      <DialogTitle id="form-dialog-title">Crear</DialogTitle>
      <DialogContent>
        <DialogContentText>Añade una Categoria</DialogContentText>

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
                Añadir
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
