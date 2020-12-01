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
import FormSelect from '../forms/FormSelect';
import { useRouter } from 'next/router';
import { ProductSchema } from 'validationSchemas/products';
import { yupResolver } from '@hookform/resolvers/yup';
import { ALL_CATEGORIES } from '@/graphql/categories';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_PRODUCTS, NEW_PRODUCT } from '@/graphql/products';
import Swal from 'sweetalert2';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function NewProduct() {
  const router = useRouter();
  const classes = useFormStyles();
  const methods = useForm({
    resolver: yupResolver(ProductSchema),
  });
  const { data, loading } = useQuery(ALL_CATEGORIES);
  const [nuevoProducto] = useMutation(NEW_PRODUCT, {
    update(cache, { data: nuevoProducto }) {
      const { allProducts } = cache.readQuery({
        query: ALL_PRODUCTS,
      });

      cache.writeQuery({
        query: ALL_PRODUCTS,
        data: {
          allProducts: [...allProducts, nuevoProducto],
        },
      });
    },
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
      await nuevoProducto({
        variables: { input },
      });

      router.push('/products');
      Swal.fire('Creado', 'Se creó producto correctamente', 'success');
    } catch (error) {
      const errorMsg = error.message.replace('Graphql error:', '');
      Swal.fire('Error', errorMsg, 'error');
    }
  }

  const categoriesMap = data?.obtenerCategorias.map((item, i) => ({
    id: item.id,
    label: item.nombre,
  }));

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
            <Title>Nuevo Producto</Title>

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
                  {loading && <CircularProgress />}
                  {categoriesMap && (
                    <Grid item xs={12}>
                      <FormSelect
                        name="categoria"
                        label="categoria"
                        options={categoriesMap}
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
