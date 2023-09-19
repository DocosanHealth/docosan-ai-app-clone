import React, { useContext } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { TextTitle } from '@/screens/SLogin/components/TextTitle';
import { TextDescription } from '@/screens/SLogin/components/TextDescription';
import { InputOTP } from '@/screens/SLogin/components/InputOTP';
import { Colors } from '@/theme';
import { useTheme } from '@/hooks';
import LoginContext from '@/screens/SLogin/LoginContext';
import { LoadingAbsolute, ButtonIcon } from '@/components';
import Modal from 'react-native-modal';
import { faArrowLeft } from '@fortawesome/pro-light-svg-icons';

type props = {
  visible: boolean;
  onRequestClose: () => void;
  onOtpFilled: (_: string) => void;
};
export const ModalOTP = ({ visible, onRequestClose, onOtpFilled }: props) => {
  const { Images } = useTheme();
  const { loadingType, onRequestOTP } = useContext(LoginContext);

  return (
    <Modal
      isVisible={visible}
      onDismiss={onRequestClose}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      style={styles.container}
    >
      <Image source={Images.otp} style={styles.imgMascot} />
      <TextTitle content={'Verify phone number'} />
      <TextDescription
        content={'Enter the 6 digit number that was sent to your phone number'}
      />
      <InputOTP onOtpFilled={onOtpFilled} />

      <TouchableOpacity style={styles.btnResend} onPress={onRequestOTP}>
        <Text style={styles.txtResend}>Resend code</Text>
      </TouchableOpacity>

      <ButtonIcon
        icon={faArrowLeft}
        onPress={onRequestClose}
        style={styles.btnClose}
      />
      <LoadingAbsolute isLoading={loadingType === 'login'} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    margin: 0,
  },
  imgMascot: {
    width: 200,
    height: 200,
    marginBottom: 16,
    resizeMode: 'contain',
  },
  btnResend: {
    marginTop: 8,
  },
  txtResend: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
    color: Colors.turquoise,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  btnClose: {
    position: 'absolute',
    top: 24,
    left: 16,
    padding: 24,
  },
});
