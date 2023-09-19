import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@/hooks';

export const Header = () => {
  const { Images } = useTheme();
  return (
    <LinearGradient
      colors={['#041123', '#1E516F']}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Image
        source={require('../../theme/assets/images/docosan-logo.png')}
        style={styles.imgLogo}
      />
    </LinearGradient>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  imgLogo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
});
