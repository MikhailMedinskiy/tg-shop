import { api } from './core/api.ts';
import { setAuthData } from './modules/auth/slice.ts';
import { API_PATHS } from './core/constants.ts';
import { generatePath } from 'react-router-dom';
import {
  CategoriesResponse,
  LoginResponseT,
  Login,
  ProductsResponse,
  AddCart,
  CartResponse,
  ProductProps,
  OrderRequest,
  OrderList,
  SelectedCategory,
  Discount,
} from './types.ts';
import { setCardCount } from './modules/navigation/slice.ts';
import { setPromo } from './modules/cart/slice.ts';

const service = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesResponse, void>({
      query: () => ({
        url: API_PATHS.CATEGORIES,
        method: 'GET',
      }),
    }),

    getProduct: builder.query<ProductProps, { productId: string }>({
      query: ({ productId }) => ({
        url: generatePath(API_PATHS.PRODUCT, { id: productId }),
        method: 'GET',
      }),
    }),

    getProducts: builder.query<ProductsResponse, SelectedCategory>({
      query: (categoryId) => ({
        url: API_PATHS.PRODUCTS,
        method: 'GET',
        params: categoryId ? { category_id: categoryId } : {},
      }),
      providesTags: ['Products'],
    }),

    productsSearch: builder.query<ProductsResponse, string>({
      query: (search) => ({
        url: API_PATHS.PRODUCTS,
        method: 'GET',
        params: {
          search,
        },
      }),
    }),

    getLikedProducts: builder.query<ProductsResponse, void>({
      query: () => ({
        url: '/api/v1/liked_products',
        method: 'GET',
      }),
      providesTags: ['LikedProducts'],
    }),

    addToWishlist: builder.mutation<
      void,
      { productId: string | number; productsArgs?: SelectedCategory }
    >({
      query: ({ productId }) => ({
        url: `/api/v1/products/${productId}/like`,
        method: 'POST',
      }),
      async onQueryStarted(
        { productId, productsArgs },
        { dispatch, queryFulfilled }
      ) {
        let productList;
        if (productsArgs || productsArgs === null) {
          productList = dispatch(
            service.util.updateQueryData(
              'getProducts',
              productsArgs,
              (draft) => {
                const product = draft.products.find((product) => {
                  return product.id === Number(productId);
                });

                if (!product) {
                  return;
                }

                product.is_liked = true;
              }
            )
          );
        } else {
          dispatch(service.util.invalidateTags(['Products']));
        }

        const product = dispatch(
          service.util.updateQueryData(
            'getProduct',
            { productId: productId.toString() },
            (draft) => {
              draft.is_liked = true;
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          productList?.undo();
          product.undo();
        }
      },
      invalidatesTags: ['LikedProducts'],
    }),

    removeFromWishlist: builder.mutation<
      void,
      { productId: string | number; productsArgs?: SelectedCategory }
    >({
      query: ({ productId }) => ({
        url: `/api/v1/products/${productId}/unlike`,
        method: 'POST',
      }),
      async onQueryStarted(
        { productId, productsArgs },
        { dispatch, queryFulfilled }
      ) {
        let productList;

        if (productsArgs || productsArgs === null) {
          productList = dispatch(
            service.util.updateQueryData(
              'getProducts',
              productsArgs,
              (draft) => {
                const product = draft.products.find((product) => {
                  return product.id === Number(productId);
                });

                if (!product) {
                  return;
                }

                product.is_liked = false;
              }
            )
          );
        } else {
          dispatch(service.util.invalidateTags(['Products']));
        }
        const product = dispatch(
          service.util.updateQueryData(
            'getProduct',
            { productId: productId.toString() },
            (draft) => {
              draft.is_liked = false;
            }
          )
        );
        const productWishList = dispatch(
          service.util.updateQueryData(
            'getLikedProducts',
            undefined,
            (draft) => {
              draft.products = draft.products.filter((product) => {
                return product.id !== productId;
              });
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          product.undo();
          productList?.undo();
          productWishList.undo();
        }
      },
      invalidatesTags: ['LikedProducts'],
    }),

    addToCart: builder.mutation<void, AddCart>({
      query: ({ variantId, quantity }) => ({
        url: API_PATHS.CARD_MUTATION,
        method: 'POST',
        body: {
          variant_id: variantId,
          quantity: quantity,
        },
      }),
      invalidatesTags: ['CartList'],
    }),

    deleteFromCart: builder.mutation<void, { variantId: string }>({
      query: ({ variantId }) => {
        return {
          url: `/api/v1/line_items/${variantId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['CartList'],
    }),

    getCartItems: builder.query<CartResponse, void>({
      query: () => ({
        url: API_PATHS.CARD,
        method: 'GET',
      }),
      providesTags: ['CartList'],
      async onQueryStarted(_props, { dispatch, queryFulfilled }) {
        await queryFulfilled.then(({ data }) => {
          dispatch(setCardCount(data?.line_items?.length || 0));
        });
      },
    }),

    createOrder: builder.mutation<void, OrderRequest>({
      query: (data) => ({
        url: '/api/v1/orders',
        method: 'POST',
        body: {
          pay_method: data.payMethod,
          comment: data.comment,
          full_name: data.fullName,
          phone: data.phone,
          city: data.city.label,
          np: data.np.label,
        },
      }),
      invalidatesTags: ['CartList'],
    }),

    increaseCartItem: builder.mutation<void, { productId: string | number }>({
      query: ({ productId }) => ({
        url: `/api/v1/line_items/${productId}/add`,
        method: 'POST',
      }),
      invalidatesTags: ['CartList'],
    }),

    decreaseCartItem: builder.mutation<void, { productId: string | number }>({
      query: ({ productId }) => ({
        url: `/api/v1/line_items/${productId}/reduce`,
        method: 'POST',
      }),
      invalidatesTags: ['CartList'],
    }),

    getOrders: builder.query<OrderList, void>({
      query: () => ({
        url: '/api/v1/orders',
        method: 'GET',
      }),
    }),

    getDiscounts: builder.query<Discount, string>({
      query: (code) => ({
        url: '/api/v1/promo_codes',
        method: 'GET',
        params: {
          code,
        },
      }),
      async onCacheEntryAdded(_request, { dispatch, cacheDataLoaded }) {
        const { data } = await cacheDataLoaded;

        dispatch(setPromo(data));
      },
    }),

    login: builder.query<LoginResponseT, Login>({
      query: ({ userName, queryId }) => ({
        url: API_PATHS.LOGIN,
        method: 'POST',
        body: {
          username: userName,
          tg_chat_id: queryId,
        },
      }),
      async onCacheEntryAdded(request, { dispatch, cacheDataLoaded }) {
        const { data } = await cacheDataLoaded;

        dispatch(
          setAuthData({
            userName: request.userName,
            authToken: data.auth_token,
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
  useGetProductQuery,
  useAddToCartMutation,
  useGetCartItemsQuery,
  useGetLikedProductsQuery,
  useDecreaseCartItemMutation,
  useIncreaseCartItemMutation,
  useDeleteFromCartMutation,
  useCreateOrderMutation,
  useGetOrdersQuery,
  useLazyProductsSearchQuery,
  useLazyGetDiscountsQuery,
} = service;
