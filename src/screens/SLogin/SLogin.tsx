import React, { useState } from 'react';
import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks';
import { Colors } from '@/theme';
import InputPhoneNumber from '@/screens/SLogin/components/InputPhoneNumber';
import { ButtonBlock } from '@/components';
import InputCheckbox from '@/screens/SLogin/components/InputCheckbox';

export type PhoneCodeType = {
  name: string;
  code: string;
  img: string;
};

const SLogin = () => {
  const { t } = useTranslation(['auth']);
  const dispatch = useDispatch();
  const { Images } = useTheme();
  const [phoneCode, setPhoneCode] = useState<PhoneCodeType>({
    name: 'Vietnam',
    code: '+84',
    img: 'https://api.docosan.com/images/sms_codes/vn.svg',
  });
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Image source={Images.mascot} style={styles.imgMascot} />

      <Text style={styles.txtLogin}>{t('title_login')}</Text>

      <InputPhoneNumber
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        phoneCode={phoneCode}
        setPhoneCode={setPhoneCode}
      />

      <Pressable
        style={styles.btnPolicy}
        onPress={() => setIsChecked(!isChecked)}
      >
        <InputCheckbox isChecked={isChecked} setIsChecked={setIsChecked} />
        <Text style={styles.txtPolicy}>
          {t('txt_policy_1')}
          <Text
            style={styles.txtPolicyTurquoise}
            onPress={() =>
              Linking.openURL('https://www.docosan.com/en/quy-che-hoat-dong')
            }
          >
            {t('txt_policy_2')}
          </Text>
        </Text>
      </Pressable>

      <ButtonBlock title={t('btn_continue')} />
    </View>
  );
};

export default SLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imgMascot: {
    width: 320,
    height: 300,
    resizeMode: 'contain',
  },
  txtLogin: {
    fontSize: 30,
    fontWeight: '700',
    color: Colors.blue,
  },
  btnPolicy: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: 350,
    marginVertical: 8,
  },
  txtPolicy: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '500',
    color: Colors.black,
    marginLeft: 8,
  },
  txtPolicyTurquoise: {
    color: Colors.turquoise,
  },
});
