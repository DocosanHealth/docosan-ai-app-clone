import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from '../../hooks';
import { Brand } from '../../components';

const Startup = () => {
  const { Layout, Gutters } = useTheme();

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Brand />
      <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} />
    </View>
  );
};

export default Startup;
