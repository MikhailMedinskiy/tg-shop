import { http, HttpResponse } from 'msw';
import { API_PATHS, API_URL } from '../../../core/constants.ts';

const productsCard = {
  cart_items: [
    {
      id: '1',
      quantity: 1,
      variant: {
        id: '1',
        name: 'Name',
        image: 'https://picsum.photos/300/300',
      },
      product: {
        id: '1',
        price: 1,
        name: 'Name',
        description: 'Description',
      },
    },
  ],
};

export const productsHandlers = [
  http.get(`${API_URL}${API_PATHS.PRODUCTS}`, () => {
    return HttpResponse.json({
      products: [
        {
          id: '1',
          name: 'name',
          description: 'description',
          price: 22,
          is_liked: false,
          category: {
            id: '1',
            name: 'name',
          },
          variants: [
            {
              id: '1',
              name: 'name',
              image: 'https://picsum.photos/300/300',
            },
          ],
        },
      ],
    });
  }),

  http.get(`${API_URL}${API_PATHS.CARD}`, () => {
    return HttpResponse.json({
      line_items: [
        {
          id: '1',
          quantity: 1,
          variant: {
            id: '1',
            name: 'Name',
            image: 'https://picsum.photos/300/300',
          },
          product: {
            id: '1',
            price: 1,
            name: 'Name',
            description: 'Description',
          },
        },
        {
          id: '1',
          quantity: 1,
          variant: {
            id: '1',
            name: 'Name',
            image: 'https://picsum.photos/300/300',
          },
          product: {
            id: '1',
            price: 1,
            name: 'Name',
            description: 'Description',
          },
        },
      ],
    });
  }),

  http.post(`${API_URL}${API_PATHS.CARD_MUTATION}`, () => {
    return HttpResponse.json({
      success: true,
    });
  }),

  http.get(`${API_URL}${API_PATHS.PRODUCT}`, () => {
    return HttpResponse.json({
      id: 1,
      name: 'name',
      description: 'description',
      price: 22,
      is_liked: false,
      category: {
        id: 1,
        name: 'name',
      },
      variants: [
        {
          id: 1,
          name: 'green',
          image: 'https://picsum.photos/300/300',
        },
        {
          id: 2,
          name: 'red',
          image: 'https://picsum.photos/300/300',
        },
        {
          id: 4,
          name: 'yellow',
          image: 'https://picsum.photos/300/300',
        },
      ],
    });
  }),

  http.post(`${API_URL}/api/v1/products/:id/like`, () => {
    return HttpResponse.json({
      success: true,
    });
  }),

  http.post(`${API_URL}/api/v1/products/:id/unlike`, () => {
    return HttpResponse.json({
      success: true,
    });
  }),

  http.get(`${API_URL}/api/v1/carts`, () => {
    return HttpResponse.json(productsCard);
  }),

  http.get(`${API_URL}/api/v1/liked_products`, () => {
    return HttpResponse.json({
      products: [
        {
          id: 1,
          name: 'name',
          image: 'https://picsum.photos/300/300',
          description: 'description',
          price: 22,
          is_liked: true,
          category: {
            id: 1,
            name: 'name',
          },
          variants: [
            {
              id: 1,
              name: 'name',
              image: 'https://picsum.photos/300/300',
            },
          ],
        },
      ],
    });
  }),

  http.get(`${API_URL}/api/v1/liked_products`, () => {
    return HttpResponse.json({
      products: [
        {
          id: 1,
          name: 'name',
          description: 'description',
          price: 22,
          is_liked: true,
          category: {
            id: 1,
            name: 'name',
          },
          variants: [
            {
              id: 1,
              name: 'name',
              image: 'https://picsum.photos/300/300',
            },
          ],
        },
        {
          id: 2,
          name: 'Some ',
          description: 'description sdfsfsdf',
          price: 2223,
          is_liked: false,
          category: {
            id: 1,
            name: 'name',
          },
          variants: [
            {
              id: 3,
              name: 'red',
              image: 'https://picsum.photos/300/300',
            },
          ],
        },
      ],
    });
  }),
];
