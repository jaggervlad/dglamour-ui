import { createContext, useContext, useReducer } from 'react';
import {
  SELECT_CLIENT,
  SELECT_PRODUCT,
  COUNT_PRODUCTS,
  UPDATE_TOTAL,
} from '@/types/orders';
import OrderReducer from 'reducers/OrderReducer';
import { ADD_COST_SHIPPING } from 'types/orders';

export const initialState = {
  cliente: {},
  productos: [],
  total: 0,
  costEnv: 0,
};

const OrderContext = createContext();

export function useOrder() {
  return useContext(OrderContext);
}

export function OrderProvider({ children }) {
  const [state, dispatch] = useReducer(OrderReducer, initialState);

  const addClient = (client) => {
    dispatch({
      type: SELECT_CLIENT,
      payload: client,
    });
  };

  const addProduct = (productsSelected) => {
    let newState;

    if (state.productos.length > 0) {
      newState = productsSelected.map((product) => {
        const newObject = state.productos.find(
          (stateProduct) => stateProduct.id === product.id
        );

        return { ...product, ...newObject };
      });
    } else {
      newState = productsSelected;
    }

    dispatch({
      type: SELECT_PRODUCT,
      payload: newState,
    });
  };

  const countProducts = (newProduct) => {
    dispatch({
      type: COUNT_PRODUCTS,
      payload: newProduct,
    });
  };

  const addShippingCost = (cost) => {
    dispatch({
      type: ADD_COST_SHIPPING,
      payload: cost,
    });
  };

  const updateTotal = () => {
    dispatch({
      type: UPDATE_TOTAL,
    });
  };

  const value = {
    client: state.cliente,
    products: state.productos,
    total: Number(state.total.toFixed(2)),
    cost: Number(state.costEnv),
    addShippingCost,
    addClient,
    addProduct,
    countProducts,
    updateTotal,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}
