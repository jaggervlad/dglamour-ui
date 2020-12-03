import EditClient from '@/components/clients/EditClient';
import { useRouter } from 'next/router';
import React from 'react';

export default function edit() {
  const router = useRouter();
  const id = router.query.id;
  return <EditClient id={id} />;
}
