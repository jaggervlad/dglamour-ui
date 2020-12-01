import React from 'react';
import { useRouter } from 'next/router';

import { Title } from '../customs/Title';
import { useFormStyles } from '@/styles/makeStyles/forms';
import EditForm from './EditForm';

import Grid from '@material-ui/core/Grid';
import AuthLayout from '../layout/AuthLayout';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ALL_CATEGORIES } from '@/graphql/categories';
import { GET_PRODUCT } from '@/graphql/products';
import { useQuery } from '@apollo/client';

export default function EditProduct(props) {
  const { id } = props;
  const router = useRouter();
  const classes = useFormStyles();

  const {
    data: categorias,
    loading: loadingCategories,
    error: errorCatergories,
  } = useQuery(ALL_CATEGORIES);
  const {
    data: product,
    loading: loadingProduct,
    error: errorProduct,
  } = useQuery(GET_PRODUCT, { variables: { id } });

  if (loadingCategories || loadingProduct) return <CircularProgress />;
  if (errorCatergories || errorProduct)
    return <Alert severity="error">Error!</Alert>;
  const categoriesMap = categorias?.obtenerCategorias.map((item, i) => ({
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
            <Title>Editar Producto</Title>

            {product.obtenerProducto && (
              <EditForm
                product={product.obtenerProducto}
                id={id}
                categories={categoriesMap}
              />
            )}
          </div>
        </Container>
      </Grid>
    </AuthLayout>
  );
}
