import { createContext } from 'react';

type LoginContextType = {
  loadingType: null | 'otp_request' | 'login';
  otp: string;
  setOtp: (otp: string) => void;
  onRequestOTP: () => void;
};

const LoginContext = createContext<LoginContextType>({
  loadingType: null,
  otp: '',
  setOtp: () => {},
  onRequestOTP: () => {},
}); // Create a context object

export default LoginContext;
