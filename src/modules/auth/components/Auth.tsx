import { useAuth } from '../../../hooks/useAuth.ts';
import { Spinner } from '../../../components/Spinner/Spinner.tsx';
import { AppError } from '../../appError';
import { AuthProps } from '../types.ts';

export const Auth = ({ children }: AuthProps) => {
  const { isLoading, isError } = useAuth();

  if (isLoading) {
    return <Spinner isFullHeight />;
  }

  if (isError) {
    return <AppError />;
  }

  return children;
};
