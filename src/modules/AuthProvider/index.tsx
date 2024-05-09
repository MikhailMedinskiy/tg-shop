import { useAuth } from '../../hooks/useAuth.ts';
import { Spinner } from '@chakra-ui/react';

type AuthProviderProps = {
  children: React.ReactNode;
};
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { isLoading, isError } = useAuth();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return children;
};
