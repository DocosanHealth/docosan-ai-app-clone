import React, { Dispatch, SetStateAction } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from '@/theme';
import { SvgUri } from 'react-native-svg';
import { PhoneCodeType } from '@/screens/SLogin/SLogin';

export default (props: {
  phoneNumber: string;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  phoneCode: PhoneCodeType;
  setPhoneCode: Dispatch<SetStateAction<PhoneCodeType>>;
}) => {
  const { phoneCode, setPhoneCode, phoneNumber, setPhoneNumber } = props;

  return (
    <View style={styles.container}>
      <Pressable style={styles.viewPhoneCodeWrapper}>
        <SvgUri width={24} height={16} uri={phoneCode.img} />

        <Text style={styles.txtPhoneCode}>{phoneCode.code}</Text>
      </Pressable>

      <TextInput
        style={styles.inputPhoneNumber}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType={'phone-pad'}
      />
    </View>
  );
};

const COMPONENT_HEIGHT = 50;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    height: COMPONENT_HEIGHT,
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 0.5,
    marginVertical: 8,
    borderColor: Colors.border,
  },
  viewPhoneCodeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 80,
    height: COMPONENT_HEIGHT,
    backgroundColor: Colors.gray,
  },
  inputPhoneNumber: {
    flex: 1,
    height: COMPONENT_HEIGHT,
    // backgroundColor: 'blue',
    paddingHorizontal: 8,
    fontSize: 18,
  },
  txtPhoneCode: {
    fontSize: 14,
    lineHeight: 16,
    color: '#4D4D4D',
  },
});
