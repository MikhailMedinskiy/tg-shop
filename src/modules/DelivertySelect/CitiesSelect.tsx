import { novaPoshtaResponseT, useGetCitiesMutation } from './service.ts';
import { AsyncSelect } from 'chakra-react-select';
import { Controller, useFormContext } from 'react-hook-form';
import { CheckoutFormProps } from '../../pages/Checkout.tsx';

export const CitiesSelect = () => {
  const { control } = useFormContext<CheckoutFormProps>();
  const [fetch] = useGetCitiesMutation();
  const loadOptions = async (inputValue: string) =>
    inputValue.length < 3
      ? []
      : fetch({ address: inputValue })
          .unwrap()
          // @ts-ignore
          .then((response: novaPoshtaResponseT) => getCitiesOptions(response))
          .catch(() => []);

  return (
    <Controller
      name='city'
      control={control}
      render={({ field }) => (
        <AsyncSelect
          noOptionsMessage={() => 'Місто не знайдено'}
          menuPortalTarget={document.body}
          loadOptions={loadOptions}
          placeholder={'Введіть місто'}
          components={{
            DropdownIndicator: null,
          }}
          onChange={field.onChange}
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

const getCitiesOptions = (data: novaPoshtaResponseT) => {
  return data?.data?.[0]?.Addresses?.map((item) => ({
    label: item.Present,
    value: item.DeliveryCity,
  }));
};
