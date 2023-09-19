import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import React from 'react';
import { Icon } from '@/components/Icon/Icon';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type Props = {
  onPress: () => void;
  icon: IconProp;
  // eslint-disable-next-line react/require-default-props
  style?: ViewStyle;
  iconColor?: string;
  iconSize?: number;
};
const ButtonIcon = (props: Props) => {
  const { icon, onPress, style, iconColor, iconSize } = props;
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <Icon icon={icon} color={iconColor} size={iconSize} />
    </Pressable>
  );
};

export default ButtonIcon;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
  },
});
