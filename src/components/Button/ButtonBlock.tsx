import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from '@/theme';
import { ButtonProps } from '@/components/Button/types';

export default (props: ButtonProps) => {
  const { title, onPress } = props;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {!!title && <Text style={styles.txtTitle}>{title}</Text>}
    </TouchableOpacity>
  );
};

const COMPONENT_HEIGHT = 50;

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: COMPONENT_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Colors.turquoise,
    alignItems: 'center',
    marginVertical: 8,
    justifyContent: 'center',
  },
  txtTitle: {
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    color: Colors.white,
  },
});
