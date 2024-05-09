import { api } from './core/api.ts';
import { setAuthData } from './modules/AuthProvider/slice.ts';
import { API_PATHS } from './core/constants.ts';

type LoginT = {
  userName: string;
};

const service = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesResponse, void>({
      query: () => ({
        url: API_PATHS.CATEGORIES,
        method: 'GET',
      }),
    }),

    getProducts: builder.query<ProductsResponse, void>({
      query: () => ({
        url: API_PATHS.PRODUCTS,
        method: 'GET',
      }),
    }),

    getLikedProducts: builder.query({
      query: () => ({
        url: '/api/v1/liked_products',
        method: 'GET',
      }),
      providesTags: ['LikedProducts'],
    }),

    getCartList: builder.query({
      query: () => ({
        url: '/api/v1/carts',
        method: 'GET',
      }),
      providesTags: ['CartList'],
    }),

    addToWishlist: builder.mutation<void, { productId: string | number }>({
      query: ({ productId }) => ({
        url: `/api/v1/products/${productId}/like`,
        method: 'POST',
      }),
      async onQueryStarted({ productId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          service.util.updateQueryData('getProducts', undefined, (draft) => {
            const product = draft.products.find((product) => {
              return product.id === Number(productId);
            });

            if (!product) {
              return;
            }

            product.is_liked = true;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['LikedProducts'],
    }),

    removeFromWishlist: builder.mutation<void, { productId: string | number }>({
      query: ({ productId }) => ({
        url: `/api/v1/products/${productId}/unlike`,
        method: 'POST',
      }),
      async onQueryStarted({ productId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          service.util.updateQueryData('getProducts', undefined, (draft) => {
            const product = draft.products.find((product) => {
              return product.id === Number(productId);
            });

            if (!product) {
              return;
            }

            console.log('product to false');

            product.is_liked = false;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['LikedProducts'],
    }),

    login: builder.query<LoginResponseT, LoginT>({
      query: ({ userName }) => ({
        url: API_PATHS.LOGIN,
        method: 'POST',
        body: {
          userName,
        },
      }),
      async onCacheEntryAdded(request, { dispatch, cacheDataLoaded }) {
        const { data } = await cacheDataLoaded;
        dispatch(
          setAuthData({
            userName: request.userName,
            authToken: data.token,
          })
        );
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useLoginQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = service;

type LoginResponseT = {
  token: string;
};

export type Variant = {
  id: number;
  name: string;
  image: string;
};

export type Category = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  is_liked: boolean;
  category: Category;
  variants: Variant[];
};

export type ProductsResponse = {
  products: Product[];
};

export type CategoriesResponse = {
  categories: CategoryListItem[];
};
export type CategoryListItem = Omit<Category, 'id'> & {
  url: string;
};
