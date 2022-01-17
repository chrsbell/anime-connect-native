import { RootStackScreenProps } from 'navigation/RootNavigator/types';
import React from 'react';
import { Button, Text, View } from 'react-native';
import styles from './styles';

export default function TitleScreen({
  navigation: { navigate },
}: RootStackScreenProps<'Title'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Default</Text>
      <Button onPress={() => navigate('Auth')} title="Authenticate with MAL" />
    </View>
  );
}
