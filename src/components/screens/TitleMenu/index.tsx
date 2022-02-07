import { RootStackScreenProps } from 'navigation/RootNavigator/types';
import React, { useState } from 'react';
import { Button, Pressable } from 'react-native';
import { useAuthenticateWithMAL } from 'screens/Auth/slice';
import styles from './styles';

export default function TitleMenuScreen({
  navigation: { navigate },
}: RootStackScreenProps<'TitleMenu'>) {
  const fetchOAuthLink = useAuthenticateWithMAL();
  fetchOAuthLink();
  const [screenPressed, setScreenPressed] = useState(false);
  // could use a reducer here for menu/animation state
  return (
    <Pressable onPress={() => setScreenPressed(true)} style={styles.container}>
      {/* <ScreenTransition
        style={{}}
        start={screenPressed}
        onFinish={() => fetchOAuthLink()}
      > */}
      <Button></Button>
      {/* </ScreenTransition> */}
    </Pressable>
  );
}
