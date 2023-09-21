import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@/hooks';
import { ButtonIcon, useActionSheet } from '@/components';
import { faBars } from '@fortawesome/pro-light-svg-icons';
import { Colors } from '@/theme';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { userLogoutAction } from '@/store/user/UserSaga';
import { RootState } from '@/store';
import { navigate } from '@/services';
import { chatReset } from '@/store/chat/ChatRedux';

export const Header = () => {
  const { Layout } = useTheme();
  const isLogged: boolean = useSelector(
    (state: RootState) => !!state.user.token,
  );
  const { t } = useTranslation(['chat']);
  const dispatch = useDispatch();
  const { showActionSheet } = useActionSheet();
  const onOpenMenu = () => {
    showActionSheet('Menu', [
      {
        title: t('btn_option_new_chat'),
        onPress: onNewChat,
      },
      {
        title: t('btn_option_history'),
        onPress: () => {
          console.log('Option 2');
        },
      },
      {
        title: t(isLogged ? 'btn_option_logout' : 'btn_option_login'),
        onPress: () => {
          if (isLogged) {
            dispatch(userLogoutAction());
          } else {
            navigate('SLogin');
          }
        },
      },
    ]);
  };

  const onNewChat = () => {
    dispatch(chatReset());
  };

  return (
    <LinearGradient
      colors={['#041123', '#1E516F']}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={Layout.fill}>
        <Image
          source={require('../../theme/assets/images/docosan-logo.png')}
          style={styles.imgLogo}
        />
      </View>

      <ButtonIcon
        onPress={onOpenMenu}
        icon={faBars}
        iconSize={24}
        iconColor={Colors.white}
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
