import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Input from '@/screens/SProfileEdit/components/Input';
import {
  faUser,
  faAt,
  faVenusMars,
  faPhone,
} from '@fortawesome/pro-light-svg-icons';
import { Colors } from '@/theme';
import { ButtonBlock, Navbar } from '@/components';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { userUpdateAction } from '@/store/user/UserSaga';
import { RootState } from '@/store';
import { call } from "redux-saga/effects";
import { reset } from "@/services";

export default function SProfileEdit() {
  const { tempPhoneCode, tempPhoneNumber } = useSelector(
    (state: RootState) => state.user,
  );
  const { t } = useTranslation(['profile']);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(
      userUpdateAction({
        display_name: name,
        email: email,
        phone_number: tempPhoneNumber,
        phone_code: tempPhoneCode,
        type: 'patient',
      }),
    );

    reset('SChat');
  };

  return (
    <ScrollView style={styles.container}>
      {/*<Navbar />*/}
      <View style={styles.viewHeader}>
        <Text style={styles.txtTitle}>
          {t('profile:screen_title_register')}
        </Text>
        <Text style={styles.txtDescription}>
          {t('profile:screen_description')}
        </Text>
      </View>
      <View style={styles.viewContent}>
        <Input
          label={t('profile:input_label_name')}
          value={name}
          placeholder={t('profile:placeholder_name')}
          onChangeText={v => setName(v)}
          icon={faUser}
        />

        <Input
          label={t('profile:input_label_email')}
          value={email}
          placeholder={t('profile:placeholder_email')}
          onChangeText={v => setEmail(v)}
          icon={faAt}
        />

        <Input
          label={t('profile:input_label_gender')}
          value={email}
          placeholder={t('profile:placeholder_gender')}
          onChangeText={v => setEmail(v)}
          icon={faVenusMars}
        />

        <Input
          label={t('profile:input_label_phone_number')}
          value={tempPhoneNumber}
          placeholder={t('profile:placeholder_phone_number')}
          icon={faPhone}
          editable={false}
        />
      </View>

      <View style={styles.viewBottom}>
        <ButtonBlock
          title={t('profile:btn_continue')}
          style={{ width: '100%' }}
          onPress={onSubmit}
          disabled={!(name && email)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  viewHeader: {
    paddingVertical: 8,
    paddingHorizontal: 32,
  },
  viewContent: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 32,
  },
  txtTitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    color: Colors.turquoise,
    marginVertical: 4,
  },
  txtDescription: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
    color: Colors.black,
  },
  viewBottom: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
});
