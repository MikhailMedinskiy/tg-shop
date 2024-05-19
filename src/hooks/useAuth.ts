import { useTelegram } from './useTelegram.ts';
import { useLoginQuery } from '../service.ts';
import { skipToken } from '@reduxjs/toolkit/query';

export const useAuth = () => {
  const { tg } = useTelegram();
  const userName = tg?.initDataUnsafe?.user?.username;
  const chatId = tg?.initDataUnsafe?.chat?.id;
  const {
    isLoading: isLoadingProfile,
    isFetching,
    isError,
    error,
  } = useLoginQuery(userName && chatId ? { userName, chatId } : skipToken);

  const isLoading = isLoadingProfile || !userName;

  return {
    error,
    isLoading,
    isFetching,
    isError,
    tg,
    user: tg.initDataUnsafe?.user,
    queryId: tg.initDataUnsafe?.query_id,
    chatId,
  };
};
