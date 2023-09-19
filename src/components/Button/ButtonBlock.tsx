import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '@/theme';
import { ButtonProps } from '@/components/Button/types';
import LinearGradient from 'react-native-linear-gradient';

export default (props: ButtonProps) => {
  const { title, onPress, isLoading } = props;
  return (
    <LinearGradient
      colors={['#4AC0A4', '#70BDE9']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {!isLoading && (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.8}
          style={styles.btnButton}
        >
          {!!title && <Text style={styles.txtTitle}>{title}</Text>}
        </TouchableOpacity>
      )}

      {isLoading && <ActivityIndicator size="small" color={Colors.white} />}
    </LinearGradient>
  );
};

const COMPONENT_HEIGHT = 50;

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: COMPONENT_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  btnButton: {
    width: '100%',
    height: COMPONENT_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtTitle: {
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    color: Colors.white,
  },
});
