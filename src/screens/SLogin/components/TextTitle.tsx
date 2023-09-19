import { Text } from 'react-native';
import React from 'react';
import { Colors } from '@/theme';

export const TextTitle = ({ content }: { content: string }) => {
  return (
    <Text
      style={{
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '700',
        color: Colors.blue,
        marginVertical: 4,
      }}
    >
      {content}
    </Text>
  );
};
