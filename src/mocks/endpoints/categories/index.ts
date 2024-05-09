import { http, HttpResponse } from 'msw';
import { API_URL } from '../../../core/constants.ts';

export const categoriesHandlers = [
  http.get(`${API_URL}/api/v1/categories`, () => {
    return HttpResponse.json({
      categories: [
        {
          name: 'name 1',
          url: 'url',
        },
        {
          name: 'name 2',
          url: 'url',
        },
        {
          name: 'name 2',
          url: 'url',
        },
      ],
    });
  }),
];
