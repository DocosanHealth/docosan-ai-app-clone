import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Colors } from '@/theme';
import { Icon } from '@/components/Icon/Icon';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useTranslation } from 'react-i18next';
import { navigate } from '@/services';

const MAX_MESSAGE_COUNT = 5;
const SystemMessage = () => {
  const isLogged: boolean = useSelector(
    (state: RootState) => !!state.user.token,
  );

  const totalQuestion = useSelector(
    (state: RootState) =>
      state.chat.messages.filter(item => item.user.id === '0').length,
  );

  const remainQuestion =
    MAX_MESSAGE_COUNT - totalQuestion >= 0
      ? MAX_MESSAGE_COUNT - totalQuestion
      : 0;
  // useTranslation
  const { t } = useTranslation(['chat']);

  if (isLogged) {
    return null;
  }

  const onNavigateToLogin = () => {
    navigate('SLogin');
  };

  return (
    <Pressable
      style={[
        styles.container,
        !remainQuestion && { backgroundColor: Colors.pink },
      ]}
      onPress={onNavigateToLogin}
    >
      <Icon
        icon={faInfoCircle}
        color={Colors.white}
        size={18}
        style={styles.iconInfo}
      />
      <Text style={styles.txtContent}>
        {t('txt_total_message_remain', { count: remainQuestion })}
      </Text>
    </Pressable>
  );
};

export default SystemMessage;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: Colors.turquoise,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  txtContent: {
    flex: 1,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.white,
    flexWrap: 'wrap',
    paddingHorizontal: 4,
    textAlign: 'left',
  },
  iconInfo: {
    marginHorizontal: 4,
  },
});
