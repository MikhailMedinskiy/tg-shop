import { useTelegram } from './useTelegram.ts';
import { useLoginQuery } from '../service.ts';
import { skipToken } from '@reduxjs/toolkit/query';

export const useAuth = () => {
  const { tg } = useTelegram();
  const userName = tg?.initDataUnsafe?.user?.username || 'Same';
  const {
    isLoading: isLoadingProfile,
    isFetching,
    isError,
  } = useLoginQuery(userName ? { userName } : skipToken);

  const isLoading = isLoadingProfile || !userName;

  return {
    isLoading,
    isFetching,
    isError,
    tg,
    user: tg.initDataUnsafe?.user,
    queryId: tg.initDataUnsafe?.query_id,
  };
};
