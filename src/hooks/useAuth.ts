import { useTelegram } from './useTelegram.ts';
import { useLoginQuery } from '../service.ts';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';

export const useAuth = () => {
  const { tg } = useTelegram();
  const userName = tg?.initDataUnsafe?.user?.username || 'sane';
  const chatId = tg?.initDataUnsafe?.query_id || '123';

  const {
    isLoading: isLoadingProfile,
    isFetching,
    isError,
  } = useLoginQuery(userName && chatId ? { userName, chatId } : skipToken);

  useEffect(() => {
    tg.expand();
  }, []);

  const isLoading = isLoadingProfile || !userName;

  return {
    isLoading,
    isFetching,
    isError,
    tg,
    user: userName,
    queryId: chatId,
  };
};
