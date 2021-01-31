import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';

export default function ButtonIcon({ children, redirect }) {
  const router = useRouter();
  return (
    <Button
      variant="contained"
      color="primary"
      style={{ marginRight: '5px' }}
      onClick={() => router.push(`/${redirect}`)}
    >
      {children}
    </Button>
  );
}
