import { RootStackScreenProps } from 'navigation/index';
import React, { useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import { useAppSelector } from 'root/hooks/store';
import { useAuthenticateWithMAL } from './slice';
import styles from './styles';

export default function MenuScreen({
  navigation: { navigate },
}: RootStackScreenProps<'TitleMenu'>) {
  const accessToken = useAppSelector(
    (state: RootState) => state.auth.accessToken
  );
  const fetchOAuthLink = useAuthenticateWithMAL();
  // const [screenPressed, setScreenPressed] = useState(false);
  // could use a reducer here for menu/animation state
  useEffect(() => {
    if (accessToken) navigate('Profile');
  }, [accessToken, navigate]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Anime Connect</Text>
      <Button
        title="Auth"
        onPress={() => {
          fetchOAuthLink();
        }}
      />
    </View>
  );
}
