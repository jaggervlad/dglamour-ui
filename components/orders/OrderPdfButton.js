import React from 'react';
import { Button } from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';
import { handlePdf } from '@/utils/events/pdf';

export default function OrderPdfButton({ id }) {
  return (
    <Button
      variant="contained"
      color="default"
      onClick={(e) => handlePdf(id, e)}
    >
      <PrintIcon />
    </Button>
  );
}
