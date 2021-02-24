import React from 'react';
import { CardActions } from '@material-ui/core';
import { OrderDeleteButtonRedirect } from './OrderDeleteButton';
import OrderEditButton from './OrderEditButton';
import OrderShippingButton from './OrderShippingButton';
import { useDeleteOrderRedirect } from '@/hooks/useDeleteOrder';

export default function OrderCardActs({ id }) {
  const { handleDelete } = useDeleteOrderRedirect(id);
  return (
    <CardActions>
      {estado === 'PENDIENTE' && (
        <>
          <OrderDeleteButtonRedirect handleClick={handleDelete} />
          <OrderEditButton id={id} />
        </>
      )}
      <OrderShippingButton id={id} />
    </CardActions>
  );
}
