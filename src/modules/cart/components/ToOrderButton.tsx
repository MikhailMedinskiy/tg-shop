import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const ToOrderButton = () => {
  const navigate = useNavigate();

  const handleMakeOrder = () => {
    navigate('/checkout');
  };

  return (
    <Button colorScheme='teal' width={'full'} onClick={handleMakeOrder}>
      Замовити
    </Button>
  );
};
