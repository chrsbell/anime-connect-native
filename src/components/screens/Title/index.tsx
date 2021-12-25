import { RootStackScreenProps } from 'navigation/RootNavigator/types';
import React from 'react';
import { Button, Text, View } from 'react-native';
import styles from './styles';

export default function TitleScreen({}: RootStackScreenProps<'Title'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Default</Text>
      <Button
        // onPress={() => navigation.navigate('Default')}
        title="dsjakldajd"
      />
    </View>
  );
}
