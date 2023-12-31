import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type MainParamsList = {
  Home: undefined;
};

export type ApplicationStackParamList = {
  Startup: undefined;
  Main: NavigatorScreenParams<MainParamsList>;
  SWelcome: undefined;
  SLogin: undefined;
  SChat: undefined;
  SProfileEdit: undefined;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
