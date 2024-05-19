import { useAuth } from '../../../hooks/useAuth.ts';
import { Spinner } from '../../../components/Spinner/Spinner.tsx';
import { AppError } from '../../appError';
import { AuthProps } from '../types.ts';
import { Box } from '@chakra-ui/react';

export const Auth = ({ children }: AuthProps) => {
  const { isLoading, isError, chatId } = useAuth();

  if (isLoading) {
    return <Spinner isFullHeight />;
  }

  if (isError) {
    return <AppError />;
  }

  return (
    <>
      <Box>chatId: {chatId}</Box>
      {children}
    </>
  );
};
