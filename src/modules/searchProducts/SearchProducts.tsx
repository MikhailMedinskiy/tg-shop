import { useLazyProductsSearchQuery } from '../../service.ts';
import { AsyncSelect, SingleValue } from 'chakra-react-select';
import { useNavigate } from 'react-router-dom';
import { Id } from '../../types.ts';
import debouncePromise from 'debounce-promise';
import { DEBOUNCE_DELAY } from '../../utils/constants.ts';

export const SearchProducts = () => {
  const [handleSearch] = useLazyProductsSearchQuery();
  const navigate = useNavigate();

  const loadOptions = async (search: string) =>
    search.length < 3
      ? []
      : handleSearch(search)
          .unwrap()
          // @ts-ignore
          .then((response) =>
            response.products.map((item) => ({
              label: item.name,
              value: item.id,
            }))
          )
          .catch(() => []);

  const debouncedLoadOptions = debouncePromise(loadOptions, DEBOUNCE_DELAY);

  const handleSelect = (
    newValue: SingleValue<{ label: string; value: Id }>
  ) => {
    navigate(`/product/${newValue?.value}`);
  };

  return (
    <AsyncSelect
      noOptionsMessage={() => 'Нічогоне знайдено'}
      menuPortalTarget={document.body}
      loadOptions={debouncedLoadOptions}
      placeholder={'Введіть назву товару'}
      components={{
        DropdownIndicator: null,
      }}
      onChange={handleSelect}
      styles={{
        menuPortal: (provided) => ({
          ...provided,
          zIndex: 999,
        }),
      }}
    />
  );
};
