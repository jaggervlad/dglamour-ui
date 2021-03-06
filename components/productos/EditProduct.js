import React from 'react';
import ProductEditForm from './ProductEditForm';
import { ALL_CATEGORIES } from '@/graphql/categories';
import { GET_PRODUCT } from '@/graphql/products';
import { useQuery } from '@apollo/client';
import Popup from '../customs/Popup';
import { Alert } from '@material-ui/lab';

export default function EditProduct(props) {
  const { id, open, setOpen } = props;
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

  if (loadingCategories || loadingProduct) return null;
  if (errorCatergories || errorProduct)
    return (
      <Alert>
        {errorCatergories ? errorCatergories.message : errorProduct.message}
      </Alert>
    );
  const categoriesMap = categorias?.obtenerCategorias.map((item, i) => ({
    id: item.id,
    label: item.nombre,
  }));

  return (
    <>
      {product.obtenerProducto && (
        <Popup
          title="Actulizar Producto"
          openPopup={open}
          setOpenPopup={setOpen}
        >
          <ProductEditForm
            product={product.obtenerProducto}
            id={id}
            categories={categoriesMap}
            setOpen={setOpen}
          />
        </Popup>
      )}
    </>
  );
}
