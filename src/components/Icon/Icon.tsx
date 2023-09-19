import React from 'react';
import { Colors } from '@/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ViewStyle } from 'react-native';

export const Icon = ({
  icon,
  size,
  color,
  style,
}: {
  icon: IconProp;
  size?: number;
  color?: string;
  style?: ViewStyle;
}) => {
  return (
    <FontAwesomeIcon
      icon={icon}
      size={size || 24}
      color={color || Colors.blue}
      style={style}
    />
  );
};
