import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Colors } from '@/theme';
import { Icon } from '@/components/Icon/Icon';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';

const SystemMessage = () => {
  return (
    <Pressable style={styles.container}>
      <Icon
        icon={faInfoCircle}
        color={Colors.white}
        size={18}
        style={styles.iconInfo}
      />
      <Text style={styles.txtContent}>
        4 messages left. Signup for free to send unlimited messages.{' '}
      </Text>
    </Pressable>
  );
};

export default SystemMessage;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: Colors.turquoise,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  txtContent: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.white,
  },
  iconInfo: {
    marginHorizontal: 4,
  },
});
