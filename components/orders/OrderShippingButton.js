import { handleShippingOrder } from '@/utils/events/pdf';
import { Button } from '@material-ui/core';
import { Print } from '@material-ui/icons';
import React from 'react';

export default function OrderShippingButton({ id }) {
  return (
    <Button
      size="small"
      variant="contained"
      onClick={(e) => handleShippingOrder(id, e)}
    >
      <Print />
    </Button>
  );
}
