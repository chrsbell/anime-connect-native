import { configureStore } from '@reduxjs/toolkit';
import screenSlices from 'screens/slices';

export const store = configureStore({ reducer: { ...screenSlices } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
