import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from '@/theme';

export default () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.txtContinue}>Continue</Text>
    </TouchableOpacity>
  );
};

const COMPONENT_HEIGHT = 50;

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: COMPONENT_HEIGHT,
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: Colors.border,
    backgroundColor: Colors.turquoise,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtContinue: {
    fontSize: 18,
    textAlign: 'center',
    color: Colors.white,
  },
});
