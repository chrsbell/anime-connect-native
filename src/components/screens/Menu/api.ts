import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AUTH_ENDPOINT } from 'root/config';

export const oauthApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${AUTH_ENDPOINT}/oauth`,
    prepareHeaders: (headers, { getState }) => {
      const { accessToken } = (getState() as RootState).auth;
      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  reducerPath: 'oauthApi',
  endpoints: (builder) => ({
    generateOAuthLink: builder.mutation<Response, { appLink: string }>({
      query: (body) => ({
        url: 'link',
        body,
        method: 'POST',
      }),
    }),
    getAccessToken: builder.mutation<
      Response,
      { codeVerifier: string; code: string }
    >({
      query: (body) => ({
        url: 'token',
        body,
        method: 'POST',
      }),
    }),
  }),
});

export const { useGenerateOAuthLinkMutation, useGetAccessTokenMutation } =
  oauthApi;
