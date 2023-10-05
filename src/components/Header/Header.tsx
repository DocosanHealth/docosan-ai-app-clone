import React from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@/hooks';
import { useActionSheet } from '@/components';
import {
  faBars,
  faClockRotateLeft,
  faArrowRightFromBracket,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import { Colors } from '@/theme';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { userLogoutAction } from '@/store/user/UserSaga';
import { RootState } from '@/store';
import { navigate } from '@/services';
import { chatReset, chatShowModalHistory } from '@/store/chat/ChatRedux';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import { Icon } from '@/components/Icon/Icon';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import LanguageSwitcher from "@/components/Languages";

export const Header = () => {
  const isLogged: boolean = useSelector(
    (state: RootState) => !!state.user.token,
  );
  const { t } = useTranslation(['chat', 'profile']);
  const dispatch = useDispatch();
  const onNewChat = () => {
    dispatch(chatReset());
  };
  const onConfirmLogout = () => {
    Alert.alert(
      t('profile:alert_title_logout'),
      t('profile:alert_message_logout'),
      [
        {
          text: t('profile:btn_cancel'),
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: t('profile:btn_continue'),
          onPress: () => {
            dispatch(userLogoutAction());
          },
        },
      ],
      { cancelable: false },
    );
  };

  const onShowChatHistory = () => {
    dispatch(chatShowModalHistory(true));
  };

  return (
    <LinearGradient
      colors={['#041123', '#1E516F']}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.viewLeft}>
        <Image
          source={require('../../theme/assets/images/docosan-logo.png')}
          style={styles.imgLogo}
        />
        <Text style={styles.txtAIDoctor}>AI DOCTOR</Text>
      </View>

      <LanguageSwitcher style={{ paddingRight: 0, paddingLeft: 16 }} />
      <Menu>
        <MenuTrigger style={styles.btnOption}>
          <Icon icon={faBars} size={24} color={Colors.white} />
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={styles.viewMenuOption}>
          <MenuOption onSelect={onNewChat} style={styles.viewMenuOptionItem}>
            <Text>{t('btn_option_new_chat')}</Text>

            <Icon icon={faComment} size={22} color={Colors.black} />
          </MenuOption>

          <MenuOption
            value={'history'}
            style={styles.viewMenuOptionItem}
            onSelect={onShowChatHistory}
          >
            <Text>{t('btn_option_history')}</Text>

            <Icon icon={faClockRotateLeft} size={20} color={Colors.black} />
          </MenuOption>

          <MenuOption
            value={'new_chat'}
            onSelect={() => {
              if (isLogged) {
                onConfirmLogout();
              } else {
                navigate('SLogin');
              }
            }}
            style={styles.viewMenuOptionItem}
          >
            <Text>
              {t(isLogged ? 'btn_option_logout' : 'btn_option_login')}
            </Text>

            <Icon
              icon={isLogged ? faArrowRightFromBracket : faUser}
              size={20}
              color={Colors.black}
            />
          </MenuOption>
        </MenuOptions>
      </Menu>
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
  },
  viewLeft: {
    flex: 1,
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnOption: {
    height: '100%',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgLogo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  txtAIDoctor: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    color: Colors.turquoise,
    marginLeft: 8,
  },
  viewMenuOption: {
    padding: 8,
    borderRadius: 8,
  },
  viewMenuOptionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
