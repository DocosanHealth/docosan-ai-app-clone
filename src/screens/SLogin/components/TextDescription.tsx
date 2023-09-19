import { Text } from 'react-native';
import React from 'react';
import { Colors } from '@/theme';

export const TextDescription = ({ content }: { content: string }) => {
  return (
    <Text
      style={{
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '400',
        color: '#4D4D4D',
        textAlign: 'center',
        marginVertical: 4,
      }}
    >
      {content}
    </Text>
  );
};
