import React from 'react';
import { LOGOUT } from '@/graphql/auth';
import { useMutation } from '@apollo/client';
import Controls from '../controls/Controls';
import { useRouter } from 'next/router';
import { setAccessToken } from '@/utils/accessToken';

export default function LogoutButton() {
  const [logout, { client }] = useMutation(LOGOUT);
  const router = useRouter();

  const handleLogout = () => {
    logout().then(() => {
      client.resetStore().then(async () => {
        setAccessToken('');
        // localStorage.removeItem('token');
        await router.push('/signin');
      });
    });
  };
  return (
    <Controls.Button
      color="secondary"
      text="Cerrar Sesion"
      size="small"
      onClick={handleLogout}
    />
  );
}
