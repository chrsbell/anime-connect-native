import React from 'react';
import { Button, View } from 'react-native';
import { useAuthenticateWithMAL } from './slice';
import styles from './styles';

export default function AuthScreen() {
  const [, setShouldFetchOAuthLink] = useAuthenticateWithMAL();
  // useGetTokensAfterRedirect();
  return (
    <View style={styles.container}>
      <Button
        title="Authenticate With MAL"
        onPress={() => setShouldFetchOAuthLink(true)}
      />
    </View>
  );
}
