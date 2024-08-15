import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// إنشاء API slice
export const productsApi = createApi({
  reducerPath: 'productsApi', // اسم الـ slice
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getNewestProducts: builder.query({
      query: () => 'Home/newest', // تحديد endpoint
    }),
  }),
});

// تصدير ال hooks
export const { useGetNewestProductsQuery } = productsApi;
