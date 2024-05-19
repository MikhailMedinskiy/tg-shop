import { Button, HStack, Input, useNumberInput } from '@chakra-ui/react';
import { useEffect, DependencyList, EffectCallback, useRef } from 'react';

type CounterProps = {
  initialValue?: number;
  onChange?: (value: number) => void;
  onIncrement?: (n: number) => void;
  onDecrement?: (n: number) => void;
};

export const Counter = ({
  initialValue,
  onChange,
  onIncrement,
  onDecrement,
}: CounterProps) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: initialValue || 1,
      min: 1,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  useEffect(() => {
    onChange?.(input.value);
  }, [input.value]);

  return (
    <HStack maxW='320px'>
      <Button
        {...dec}
        colorScheme={'teal'}
        onClick={() => {
          onIncrement?.(input.value);
        }}
      >
        -
      </Button>
      <Input
        isDisabled
        {...input}
        width={'100px'}
        textAlign={'center'}
        style={{
          opacity: 1,
        }}
      />
      <Button
        colorScheme={'teal'}
        {...inc}
        onClick={() => {
          onDecrement?.(input.value);
        }}
      >
        +
      </Button>
    </HStack>
  );
};

export function useDidUpdate(effect: EffectCallback, deps?: DependencyList) {
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    return effect();
  }, deps);
}
