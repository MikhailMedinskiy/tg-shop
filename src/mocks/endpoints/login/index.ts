import { http, HttpResponse } from 'msw';
import { API_PATHS, API_URL } from '../../../core/constants.ts';

export const authHandlers = [
  // @ts-ignore

  http.post(`${API_URL}${API_PATHS.LOGIN}`, () => {
    return HttpResponse.json({
      auth_token: '12345678',
    });
  }),
];
