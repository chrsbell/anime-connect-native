import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchData } from 'apis/';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { useCallback } from 'react';
import Toast from 'react-native-root-toast';
import { RootState } from 'store';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { Object } from 'ts-toolbelt';
import { useGenerateOAuthLinkMutation, useGetAccessTokenMutation } from './api';

type AuthState = Object.Nullable<{
  accessToken: string;
  refreshToken: string;
}>;

const slice = createSlice({
  name: 'oauth',
  initialState: {
    accessToken: null,
    refreshToken: null,
    codeVerifier: null,
  } as AuthState,
  reducers: {
    gotNewTokens: (
      state,
      {
        payload: { accessToken, refreshToken },
      }: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
  },
});

export const { gotNewTokens } = slice.actions;

function logErrors(result: any) {
  if (result.isError)
    Toast.show('Unknown API error.', {
      duration: Toast.durations.LONG,
    });
}

// Note: when query cache entries change, the component using this hook
// will re-render which is intentional. So the component can display query status etc.
// https://github.com/reduxjs/redux-toolkit/issues/1660#issuecomment-953252606
export function useAuthenticateWithMAL() {
  const [fetchLink, fetchLinkResult] = useGenerateOAuthLinkMutation();
  const [fetchAccessToken, fetchAccessTokenResult] =
    useGetAccessTokenMutation();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(
    (state: RootState) => state.auth.accessToken
  );

  logErrors(fetchLinkResult);
  logErrors(fetchAccessTokenResult);

  const getAccessToken = useCallback(
    async (url: string, data: OAuthRedirectResponse, appLink: string) => {
      const { queryParams }: { queryParams: { code: string; state: string } } =
        Linking.parse(url);
      if (queryParams?.code && queryParams?.state === data?.oaState) {
        // req from backend
        await fetchData<OAuthTokenResponse>(
          fetchAccessToken,
          {
            code: queryParams.code,
            codeVerifier: data?.codeVerifier,
            redirectURL: appLink,
          },
          async (tokenData: OAuthTokenResponse) => {
            console.log(tokenData.accessToken);
            dispatch(
              gotNewTokens({
                accessToken: tokenData.accessToken,
                refreshToken: tokenData.refreshToken,
              })
            );
          }
        );
      }
    },
    [dispatch, fetchAccessToken]
  );

  const fetchAndDispatch = async () => {
    if (!accessToken) {
      const appLink = await Linking.createURL('/');
      await fetchData(
        fetchLink,
        { appLink },
        async (redirectData: OAuthRedirectResponse) => {
          const supported = await Linking.canOpenURL(redirectData?.redirectURL);
          if (supported) {
            // weird situation where MAL api needs the redirect_uri when multiple app redirect
            // urls are defined during /authorize and and /token, but expo needs a separate
            // redirectURL argument to work with this function
            const result = await WebBrowser.openAuthSessionAsync(
              redirectData.redirectURL,
              appLink
            );
            await WebBrowser.maybeCompleteAuthSession();
            if (result.type === 'success') {
              getAccessToken(result.url, redirectData, appLink);
            }
          }
        }
      );
    }
  };

  return fetchAndDispatch;
}

export default slice.reducer;
