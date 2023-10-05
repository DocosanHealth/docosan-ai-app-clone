import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonIcon } from '@/components';
import { faArrowLeft } from '@fortawesome/pro-light-svg-icons';
import { goBack } from '@/services';

export default function Navbar() {
  const onBack = () => {
    goBack();
  };

  return (
    <View style={styles.container}>
      <ButtonIcon onPress={onBack} icon={faArrowLeft} style={styles.btnBack} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnBack: {
    paddingHorizontal: 40,
  },
});
