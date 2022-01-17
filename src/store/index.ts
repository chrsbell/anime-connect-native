import { configureStore } from '@reduxjs/toolkit';
import { oauthApi } from 'screens/Auth/api';
import screenSlices from 'screens/slices';

export const store = configureStore({
  reducer: { ...screenSlices, [oauthApi.reducerPath]: oauthApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(oauthApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
