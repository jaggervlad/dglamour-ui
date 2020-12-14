import EditUser from '@/components/auth/EditUser';
import { useRouter } from 'next/router';
import React from 'react';

export default function edit() {
  const router = useRouter();
  const id = router.query.id;
  return <EditUser id={id} />;
}
