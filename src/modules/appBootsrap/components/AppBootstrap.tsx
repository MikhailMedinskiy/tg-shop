import { useGetCartItemsQuery } from '../../../service.ts';
import { Spinner } from '../../../components/Spinner/Spinner.tsx';
import { AppError } from '../../appError';
import { AppBootstrapProps } from '../types.ts';

export const AppBootstrap = ({ children }: AppBootstrapProps) => {
  const { isLoading, isError } = useGetCartItemsQuery();

  if (isLoading) {
    return <Spinner isFullHeight />;
  }

  if (isError) {
    return <AppError />;
  }

  return children;
};
