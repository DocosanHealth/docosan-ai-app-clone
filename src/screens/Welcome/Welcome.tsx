import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Welcome = () => {
  const { t } = useTranslation(['example', 'welcome']);
  const dispatch = useDispatch();

  return <View style={{

  }} />;
};

export default Welcome;


