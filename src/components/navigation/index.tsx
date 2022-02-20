import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import MenuScreen from 'screens/Menu';
import UserProfile from 'screens/UserProfile';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  TitleMenu: undefined;
  Auth: undefined; // union with NavigatorScreenParams generic with screen types
  // if nested navigator as component prop
  Profile: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Title/Authentication Group */}
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen
            name="TitleMenu"
            component={MenuScreen}
            options={{ headerShown: false }}
          />
          <Stack.Group screenOptions={{ presentation: 'card' }}>
            <Stack.Screen
              name="Profile"
              component={UserProfile}
              options={{ headerShown: false }}
            />
          </Stack.Group>
          {/* <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false, presentation: 'transparentModal' }}
        /> */}
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
