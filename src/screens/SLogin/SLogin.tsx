import React, { useState } from 'react';
import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks';
import { Colors } from '@/theme';
import InputPhoneNumber from '@/screens/SLogin/components/InputPhoneNumber';
import { ButtonBlock } from '@/components';
import InputCheckbox from '@/screens/SLogin/components/InputCheckbox';
import { ModalOTP } from '@/screens/SLogin/components/ModalOTP';
import { TextTitle } from '@/screens/SLogin/components/TextTitle';
import { Api } from '@/services';
import LoginContext from './LoginContext';
import { userLoginAction } from '@/store/user/UserSaga';
import { RootState } from '@/store';

export type PhoneCodeType = {
  name: string;
  code: string;
  img: string;
};

const api = Api.create();

const SLogin = () => {
  const { t } = useTranslation(['auth']);
  const { Images } = useTheme();
  const language = useSelector((state: RootState) => state.appState.language);
  const [phoneCode, setPhoneCode] = useState<PhoneCodeType>({
    name: 'Vietnam',
    code: '+84',
    img: 'https://api.docosan.com/images/sms_codes/vn.svg',
  });
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [loadingType, setLoadingType] = useState<
    null | 'otp_request' | 'login'
  >(null);
  const [isShowOTP, setIsShowOTP] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const dispatch = useDispatch();

  const onRequestOTP = async () => {
    if (!isChecked) {
      return;
    }
    setLoadingType('otp_request');
    setOtp('');
    try {
      const { data } = await api.requestOTP({
        language: language || 'vi',
        phone_number: phoneNumber,
        phone_code: phoneCode.code,
      });
      if (data.code) {
        const _codes = data.code + '';
        // loop through each character in the code
        for (let i = 0; i < _codes.length; i++) {
          // add each character to the otp
          setTimeout(() => {
            setOtp(prev => prev + _codes[i]);
          }, i * 1000);
        }
      }
      setIsShowOTP(true);
    } catch (e) {
      console.log(e);
    }
    setLoadingType(null);
  };

  const onLogin = async (_otp: string) => {
    setLoadingType('login');
    const onCallback = () => setLoadingType(null);
    dispatch(
      userLoginAction({
        phone_number: phoneNumber,
        code: _otp,
        phone_code: phoneCode.code,
        language: 'vi',
        is_login: 1,
        onSuccess: onCallback,
        onError: onCallback,
      }),
    );
  };

  return (
    <LoginContext.Provider
      value={{
        loadingType,
        otp,
        setOtp,
        onRequestOTP,
      }}
    >
      <View style={styles.container}>
        <Image source={Images.mascot} style={styles.imgMascot} />

        <TextTitle content={t('title_login')} />

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

        <ButtonBlock
          title={t('btn_continue')}
          onPress={onRequestOTP}
          isLoading={loadingType === 'otp_request'}
          disabled={!isChecked}
        />
        <ModalOTP
          visible={isShowOTP}
          onRequestClose={() => setIsShowOTP(false)}
          onOtpFilled={onLogin}
        />
      </View>
    </LoginContext.Provider>
  );
};

export default SLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  imgMascot: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
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
