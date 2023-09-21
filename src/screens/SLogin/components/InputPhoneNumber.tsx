import React, { Dispatch, SetStateAction } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from '@/theme';
import { SvgUri } from 'react-native-svg';
import { PhoneCodeType } from '@/screens/SLogin/SLogin';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useActionSheet } from '@/components';

export default (props: {
  phoneNumber: string;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  phoneCode: PhoneCodeType;
  setPhoneCode: Dispatch<SetStateAction<PhoneCodeType>>;
}) => {
  const { phoneCode, setPhoneCode, phoneNumber, setPhoneNumber } = props;
  const phoneCodes: PhoneCodeType[] = useSelector(
    (state: RootState) => state.appState.phoneCodes || [],
  );
  const { showActionSheet } = useActionSheet();

  const onShowPhoneCodeModal = () => {
    showActionSheet(
      'Select Phone Code',
      phoneCodes.map(item => ({
        title: item.name,
        onPress: () => {
          setPhoneCode(item);
        },
        image: (
          <SvgUri
            width={24}
            height={16}
            uri={item.img}
            style={styles.imgFlag}
          />
        ),
      })),
    );
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.viewPhoneCodeWrapper}
        onPress={onShowPhoneCodeModal}
      >
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
    justifyContent: 'center',
    width: 80,
    height: COMPONENT_HEIGHT,
    backgroundColor: '#94949433',
  },
  inputPhoneNumber: {
    flex: 1,
    height: COMPONENT_HEIGHT,
    paddingHorizontal: 8,
    fontSize: 18,
  },
  txtPhoneCode: {
    fontSize: 14,
    lineHeight: 16,
    color: '#4D4D4D',
    marginLeft: 8,
  },
  imgFlag: {
    width: 24,
    height: 16,
    resizeMode: 'cover',
    marginRight: 8,
  },
});
