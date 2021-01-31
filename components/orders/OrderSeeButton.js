import React from 'react';
import Link from 'next/link';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Button } from '@material-ui/core';

export default function OrderSeeButton({ id }) {
  return (
    <Link href="/seeorder/[id]" as={`/seeorder/${id}`}>
      <Button variant="contained" color="primary">
        <VisibilityIcon />
      </Button>
    </Link>
  );
}
