import { novaPoshApi } from './../../core/novaPoshta.ts';

export type novaPoshtaResponseT = {
  data: {
    Addresses: {
      Present: string;
      MainDescription: string;
      DeliveryCity: string;
    }[];
  }[];
};

export type wareHousesResponseT = {
  data: {
    Description: string;
    Ref: string;
  }[];
};

const service = novaPoshApi.injectEndpoints({
  endpoints: (builder) => ({
    getCities: builder.mutation<novaPoshtaResponseT, { address: string }>({
      query: ({ address }) => ({
        url: '',
        method: 'POST',
        body: {
          modelName: 'Address',
          calledMethod: 'searchSettlements',
          methodProperties: {
            CityName: address,
          },
        },
      }),
    }),
    getWareHouses: builder.query<wareHousesResponseT, { cityRef: string }>({
      query: ({ cityRef }) => ({
        url: '',
        method: 'POST',
        body: {
          modelName: 'AddressGeneral',
          calledMethod: 'getWarehouses',
          methodProperties: {
            Language: 'ua',
            CityRef: cityRef,
          },
        },
      }),
    }),
  }),
});

export const { useGetCitiesMutation, useGetWareHousesQuery } = service;

// const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
//   method: 'POST',
//   body: JSON.stringify({
//     modelName: 'AddressGeneral',
//     calledMethod: 'getWarehouses',
//     methodProperties: {
//       Language: 'ua',
//       CityRef: 'ref',
//     },
//   }),
// });
