import { Button, HStack, Input, useNumberInput } from '@chakra-ui/react';

export const Counter = () => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack maxW='320px'>
      <Button {...dec} colorScheme={'teal'}>
        -
      </Button>
      <Input {...input} width={'100px'} textAlign={'center'} />
      <Button colorScheme={'teal'} {...inc}>
        +
      </Button>
    </HStack>
  );
};
