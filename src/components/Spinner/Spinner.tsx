import { Center, Spinner as ChakraSpinner } from '@chakra-ui/react';

const fullHeightStyles = {
  position: 'fixed',
  zIndex: 'modal',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

type SpinnerProps = {
  isFullHeight?: boolean;
};

export const Spinner = ({ isFullHeight }: SpinnerProps) => {
  return (
    <Center sx={isFullHeight ? fullHeightStyles : {}}>
      <ChakraSpinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='teal'
        size='xl'
      />
    </Center>
  );
};
