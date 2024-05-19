import { AsyncSelect } from 'chakra-react-select';
import { Controller, useFormContext } from 'react-hook-form';
import { novaPoshtaResponseT, useGetCitiesMutation } from '../service.ts';
import { CheckoutFormProps } from '../types.ts';
import debouncePromise from 'debounce-promise';
import { DEBOUNCE_DELAY } from '../../../utils/constants.ts';

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

  const debouncedLoadOptions = debouncePromise(loadOptions, DEBOUNCE_DELAY);

  return (
    <Controller
      name='city'
      control={control}
      render={({ field }) => (
        <AsyncSelect
          noOptionsMessage={() => 'Місто не знайдено'}
          menuPortalTarget={document.body}
          loadOptions={debouncedLoadOptions}
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
