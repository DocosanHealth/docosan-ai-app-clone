import React, { useMemo, useRef } from 'react';
import { Text, StyleSheet, Image, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { appSelectLanguageAction } from '@/store/appState/AppStateSaga';
import { useDispatch } from 'react-redux';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import { Colors } from '@/theme';

type Props = {
  style?: ViewStyle;
};
const LanguageSwitcher: React.FC = (props: Props) => {
  const { style } = props;
  const language = useSelector((state: RootState) => state.appState.language);
  const dispatch = useDispatch();

  const handleLanguageChange = (_lang: 'vi' | 'en') => {
    if (_lang === 'en') {
      // Xử lý chuyển đổi sang Tiếng Anh
      dispatch(appSelectLanguageAction('en'));
    } else if (_lang === 'vi') {
      // Xử lý chuyển đổi sang Tiếng Việt
      dispatch(appSelectLanguageAction('vi'));
    }
  };

  const selectedLangData = useMemo(() => {
    let _language = 'EN';
    let flag = require('theme/assets/images/US.png');

    if (language === 'vi') {
      _language = 'VI';
      flag = require('theme/assets/images/VN.png');
    }
    return {
      language: _language,
      flag,
    };
  }, [language]);

  return (
    <Menu>
      <MenuTrigger style={[styles.container, style]}>
        <Image source={selectedLangData.flag} style={styles.imgSelectFlag} />
        {/*<Text style={styles.txtSelectedLang}>{selectedLangData.language}</Text>*/}
      </MenuTrigger>

      <MenuOptions optionsContainerStyle={styles.viewMenuOption}>
        <MenuOption
          onSelect={() => handleLanguageChange('vi')}
          style={styles.viewMenuOptionItem}
        >
          <Image
            source={require('theme/assets/images/VN.png')}
            style={styles.imgFlag}
          />
          <Text style={styles.txtLanguageItem}>Tiếng Việt</Text>
        </MenuOption>

        <MenuOption
          onSelect={() => handleLanguageChange('en')}
          style={styles.viewMenuOptionItem}
        >
          <Image
            source={require('theme/assets/images/US.png')}
            style={styles.imgFlag}
          />
          <Text style={styles.txtLanguageItem}>English</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

export default LanguageSwitcher;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  imgSelectFlag: {
    width: 20,
    height: 15,
    marginRight: 10,
    resizeMode: 'contain',
  },
  txtSelectedLang: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
    color: Colors.white,
  },
  viewMenuOption: {
    borderRadius: 8,
    padding: 8,
  },
  viewMenuOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgFlag: {
    width: 20,
    height: 15,
    marginRight: 10,
  },
  txtLanguageItem: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
    color: Colors.black,
  },
});
