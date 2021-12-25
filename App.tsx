import { StatusBar } from 'expo-status-bar';
import Navigation from 'navigation/index';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/store';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Navigation />
        <StatusBar />
      </Provider>
    </SafeAreaProvider>
  );
}
