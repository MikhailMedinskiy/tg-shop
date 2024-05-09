import { Select } from 'chakra-react-select';
import { useGetWareHousesQuery } from './service.ts';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { CheckoutFormProps } from '../../pages/Checkout.tsx';

export const WareHouseSelect = () => {
  const { watch, setValue, control } = useFormContext<CheckoutFormProps>();
  const selectCityRef = watch('city')?.value ?? null;
  const { data: wareHousesData, isFetching } = useGetWareHousesQuery(
    selectCityRef ? { cityRef: selectCityRef } : skipToken
  );

  useEffect(() => {
    setValue('warehouse', null);
  }, [selectCityRef]);

  const prepareWareHousesOptions = useMemo(() => {
    return wareHousesData?.data?.map(
      (item: { Description: string; Ref: string }) => ({
        label: item.Description,
        value: item.Ref,
      })
    );
  }, [wareHousesData]);
  return (
    <Controller
      name='warehouse'
      control={control}
      render={({ field }) => (
        <Select
          noOptionsMessage={() => 'Відділення не знайдено'}
          isLoading={isFetching}
          menuPortalTarget={document.body}
          placeholder={'Оберіть Відділення'}
          onChange={field.onChange}
          options={selectCityRef ? prepareWareHousesOptions : []}
          components={{
            DropdownIndicator: null,
          }}
          styles={{
            menuPortal: (provided) => ({
              ...provided,
              zIndex: 999,
            }),
          }}
        />
      )}
    />
  );
};
