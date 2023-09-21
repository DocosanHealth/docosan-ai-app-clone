import React, { useEffect } from 'react';
import { Colors } from '@/theme';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Avatar } from '@/components/Chat/Avatar';
import { useTheme } from '@/hooks';

const Dot = ({
  color,
  index,
}: {
  color: string;
  index: number;
}) => {
  const offset = useSharedValue(5);
  const opacity = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
    opacity: opacity.value,
  }));

  useEffect(() => {
    setTimeout(() => {
      offset.value = withRepeat(
        withTiming(-offset.value, { duration: 1000, easing: Easing.linear }),
        -1,
        true,
      );
      opacity.value = withRepeat(withTiming(0.5, { duration: 1000 }), -1, true);
    }, index * 100);
  }, []);
  return (
    <Animated.View
      style={[
        {
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 4,
        },
        animatedStyles,
      ]}
    />
  );
};
export function LoadingMessage() {
  const { Images } = useTheme();
  return (
    <View style={styles.container}>
      <Avatar source={Images.mascot} />
      <View style={styles.viewDots}>
        <Dot color={Colors.blue} index={1} />
        <Dot color={Colors.blue} index={2} />
        <Dot color={Colors.blue} index={3} />
        <Dot color={Colors.blue} index={4} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  viewDots: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 8,
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    maxWidth: '90%',
  },
});
