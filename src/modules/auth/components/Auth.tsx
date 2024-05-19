import { useAuth } from '../../../hooks/useAuth.ts';
import { Spinner } from '../../../components/Spinner/Spinner.tsx';
import { AppError } from '../../appError';
import { AuthProps } from '../types.ts';
import { Box } from '@chakra-ui/react';
// @ts-ignore
import convert from 'object-plain-string';

export const Auth = ({ children }: AuthProps) => {
  const { isLoading, isError, tg } = useAuth();

  if (isLoading) {
    return <Spinner isFullHeight />;
  }

  if (isError) {
    return <AppError />;
  }

  return (
    <>
      <Box id='chatId' dangerouslySetInnerHTML={{ __html: convert(tg) }} />
      {children}
    </>
  );
};
