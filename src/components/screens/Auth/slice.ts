import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchData } from 'apis/';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import Toast from 'react-native-root-toast';
import { useAppDispatch } from 'store/hooks';
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
  const [shouldFetch, setShouldFetch] = useState(false);
  const dispatch = useAppDispatch();

  logErrors(fetchLinkResult);
  logErrors(fetchAccessTokenResult);
  const getAccessToken = async (
    url: string,
    data: OAuthRedirectResponse,
    appLink: string
  ) => {
    const { queryParams }: { queryParams: { code: string; state: string } } =
      Linking.parse(url);
    debugger;
    if (queryParams?.code && queryParams?.state === data?.oaState) {
      // req from backend
      await fetchData<OAuthTokenResponse>(
        fetchAccessToken,
        {
          code: queryParams.code,
          codeVerifier: data?.codeVerifier,
          redirectURL: appLink,
        },
        async (data: OAuthTokenResponse) => {
          debugger;
          dispatch(
            gotNewTokens({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            })
          );
        }
      );
    }
  };

  useEffect(() => {
    if (shouldFetch) {
      const fetchAndDispatch = async () => {
        const appLink = await Linking.createURL('/');
        await fetchData(
          fetchLink,
          { appLink },
          async (data: OAuthRedirectResponse) => {
            const supported = await Linking.canOpenURL(data?.redirectURL);
            if (supported) {
              const result = await WebBrowser.openAuthSessionAsync(
                data.redirectURL,
                appLink
              );
              await WebBrowser.maybeCompleteAuthSession();
              if (result.type === 'success') {
                getAccessToken(result.url, data, appLink);
              }
            }
          }
        );
      };
      fetchAndDispatch();
    }
  }, [shouldFetch, dispatch]);

  return [shouldFetch, setShouldFetch];
}

// export function useGetTokensAfterRedirect() {
//   const [fetchAccessToken, result] = useLazyGetAccessTokenQuery();
//   const originalState = useAppSelector((state) => state.auth.originalState);
//   const dispatch = useAppDispatch();
//   // request initial access token after redirect
//   useEffect(() => {
//     if (originalState) {
//       const handler = async ({ url }: EventType) => {
//         const {
//           queryParams,
//         }: { queryParams: { code: string; state: string } } =
//           Linking.parse(url);
//         debugger;
//         if (queryParams?.code && queryParams?.state === originalState) {
//           // req from backend
//           await fetchData<OAuthTokenResponse>(
//             fetchAccessToken,
//             null,
//             async (data: OAuthTokenResponse) => {
//               debugger;
//               dispatch(
//                 gotNewTokens({
//                   accessToken: <string>data.headers.get('Authorization'),
//                   refreshToken: data.refreshToken,
//                 })
//               );
//             }
//           );
//         } else {
//           networkAlert();
//         }
//       };
//       Linking.addEventListener('url', handler);
//       return () => Linking.removeEventListener('url', handler);
//     }
//   }, [originalState, dispatch, fetchAccessToken]);
// }

export default slice.reducer;
