import { useAppDispatch, useAppSelector } from 'hooks/index';
import { RootStackScreenProps } from 'navigation/RootNavigator/types';
import { Text, View } from 'react-native';
import styles from './styles';

export default function TitleScreen({}: RootStackScreenProps<'Auth'>) {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.auth.value);
  const dispatch = useAppDispatch();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Count: ${count}`}</Text>
    </View>
  );
}
