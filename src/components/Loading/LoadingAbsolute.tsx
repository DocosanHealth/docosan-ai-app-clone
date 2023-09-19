import { ActivityIndicator, View } from 'react-native';
import React from 'react';
import { Colors } from '@/theme';

export const LoadingAbsolute = ({
  isLoading = false,
}: {
  isLoading: boolean;
}) => {
  if (!isLoading) {
    return null;
  }
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 9999,
      }}
    >
      <ActivityIndicator color={Colors.white} size={'large'} />
    </View>
  );
};
