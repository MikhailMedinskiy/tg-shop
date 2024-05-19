import { Center, Spinner as ChakraSpinner } from '@chakra-ui/react';

const fullHeightStyles = {
  position: 'fixed',
  zIndex: 'modal',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

export const Spinner = () => {
  return (
    <Center sx={fullHeightStyles}>
      <ChakraSpinner />
    </Center>
  );
};
