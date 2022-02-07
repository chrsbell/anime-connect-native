import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import TitleMenuScreen from 'screens/Title';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      {/* Title/Authentication Group */}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="TitleMenu"
          component={TitleMenuScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false, presentation: 'transparentModal' }}
        /> */}
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default RootNavigator;
