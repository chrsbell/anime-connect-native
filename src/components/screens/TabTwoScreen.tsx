import React from 'react';
import { StyleSheet, TextStyle, View, ViewStyle, Text } from 'react-native';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  } as TextStyle,
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  } as ViewStyle,
});
