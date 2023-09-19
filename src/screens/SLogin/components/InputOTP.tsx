import { StyleSheet, TextInput } from 'react-native';
import { Colors } from '@/theme';
import React, { useContext, useEffect } from 'react';
import LoginContext from '@/screens/SLogin/LoginContext';

export const InputOTP = ({
  onOtpFilled,
}: {
  onOtpFilled: (_otp: string) => void;
}) => {
  const { otp, setOtp } = useContext(LoginContext);

  useEffect(() => {
    if (otp.length === 6) {
      onOtpFilled(otp);
    }
  }, [otp]);

  return (
    <TextInput
      style={styles.container}
      keyboardType={'number-pad'}
      inputMode={'numeric'}
      placeholder={'- - - - - -'}
      placeholderTextColor={Colors.gray}
      maxLength={6}
      value={otp}
      onChangeText={text => setOtp(text)}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: 268,
    height: 46,
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: Colors.border,
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 30,
    marginVertical: 8,
  },
});
