import React from 'react';
import { StyleSheet, View } from 'react-native';
import Keyboard from './components/Keyboard';

export default function App() {
  return (
    <View style={styles.container}>
      <Keyboard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
