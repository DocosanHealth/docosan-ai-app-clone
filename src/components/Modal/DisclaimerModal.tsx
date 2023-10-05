import Modal from 'react-native-modal';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/theme';
import { useTranslation } from 'react-i18next';
import { appStateUpdate } from '@/store/appState/AppStateRedux';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';

const DisclaimerModal = () => {
  const isVisible = useSelector(
    (state: RootState) => !state.appState.isAgreeDisclaimer,
  );
  const { t } = useTranslation(['disclaimer']);
  const dispatch = useDispatch();

  const onAgree = () => {
    dispatch(appStateUpdate({ isAgreeDisclaimer: true }));
  };
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.viewContent}>
        <Text style={styles.txtContent}>{t('disclaimer:content')}</Text>

        <View style={styles.viewBtnWrapper}>
          <Pressable
            style={[styles.btnGeneral, styles.btnAgree]}
            onPress={onAgree}
          >
            <Text style={styles.txtBtn}>{t('disclaimer:btn_accept')}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default DisclaimerModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  viewContent: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 8,
  },
  txtContent: {
    textAlign: 'center',
  },
  viewBtnWrapper: {
    flexDirection: 'column',
    marginVertical: 8,
  },
  btnGeneral: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
  },
  btnAgree: {
    backgroundColor: '#D9D9D9',
  },
  txtBtn: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
});
