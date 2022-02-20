import { StatusBar } from 'expo-status-bar';
import Navigation from 'navigation/index';
import React from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from 'root/store';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <RootSiblingParent>
          <Navigation />
          <StatusBar />
        </RootSiblingParent>
      </Provider>
    </SafeAreaProvider>
  );
}
