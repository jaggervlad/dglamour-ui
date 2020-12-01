import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useFormStyles } from '../../styles/makeStyles/forms';
import FormInput from '../forms/FormInput';
import { FormProvider, useForm } from 'react-hook-form';
import FormSelect from '../forms/FormSelect';
import { ProductSchema } from 'validationSchemas/products';
import { yupResolver } from '@hookform/resolvers/yup';
import { UPDATE_PRODUCT } from '@/graphql/products';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

export default function EditForm(props) {
  const classes = useFormStyles();
  const router = useRouter();
  const { id, categories, product } = props;
  const [actualizarProducto] = useMutation(UPDATE_PRODUCT);
  const {
    nombre,
    existencia,
    precio,
    marca,
    undMed,
    categoria,
    presentacion,
  } = product;
  const preload = {
    nombre,
    existencia,
    precio,
    marca,
    undMed,
    presentacion,
    categoria: categoria.id,
  };
  const methods = useForm({
    defaultValues: preload,
    resolver: yupResolver(ProductSchema),
  });

  const { handleSubmit, formState, errors } = methods;
  const { isSubmitting } = formState;

  async function onSubmit(data) {
    const input = {
      existencia: +data.existencia,
      precio: +data.precio,
      ...data,
    };

    try {
      await actualizarProducto({
        variables: { id, input },
      });

      router.push('/products');
      Swal.fire('Creado', 'Producto editado correctamente', 'success');
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
            <FormInput name="nombre" label="Nombre" errorobj={errors} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormInput
              type="number"
              name="precio"
              label="$precio"
              errorobj={errors}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput
              type="number"
              name="existencia"
              label="#cantidad"
              errorobj={errors}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormInput name="marca" label="Marca" errorobj={errors} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput
              name="undMed"
              label="Unidad de Medida"
              errorobj={errors}
            />
          </Grid>
          {categories && (
            <Grid item xs={12}>
              <FormSelect
                name="categoria"
                label="categoria"
                options={categories}
                errorobj={errors}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <FormInput
              name="presentacion"
              label="Presentacion"
              multiline
              rowsMax={4}
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
