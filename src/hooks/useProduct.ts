import { useParams } from 'react-router-dom';
import { useGetProductQuery } from '../service.ts';

export const useProduct = () => {
  const { slug } = useParams();
  const { data, isLoading, isFetching, isError } = useGetProductQuery({
    productId: slug as string,
  });
  const product = data || null;

  return {
    isLoading,
    isFetching,
    isError,
    product,
  };
};
