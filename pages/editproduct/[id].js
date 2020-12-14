import { useRouter } from 'next/router';
import React from 'react';
import EditProduct from '@/components/productos/EditProduct';

export default function edit() {
  const router = useRouter();
  const { id } = router.query;

  return <EditProduct id={id} />;
}
