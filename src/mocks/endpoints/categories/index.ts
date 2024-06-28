import { http, HttpResponse } from 'msw';
import { API_URL } from '../../../core/constants.ts';

export const categoriesHandlers = [
  http.get(`${API_URL}/api/v1/categories`, () => {
    return HttpResponse.json({
      categories: [
        {
          id: '1',
          name: 'Nadf',
          image: 'sdf',
        },
        {
          id: '2',
          name: 'Nadf',
          image: 'sdf',
        },
        {
          id: '3',
          name: 'Nadf',
          image: 'sdf',
        },
      ],
    });
  }),
];
