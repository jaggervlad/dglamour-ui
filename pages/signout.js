import { useApolloClient, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { LOGOUT } from '@/graphql/auth';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function SignOut() {
  const client = useApolloClient();
  const router = useRouter();
  const [logout] = useMutation(LOGOUT);

  useEffect(() => {
    logout().then(() => {
      client.resetStore().then(() => {
        localStorage.removeItem('token');
        router.push('/signin');
      });
    });
  }, [logout, router, client]);

  return <CircularProgress />;
}
