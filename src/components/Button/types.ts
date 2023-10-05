import { ViewStyle } from "react-native";

export type ButtonProps = {
  title?: string;
  onPress?: () => any;
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
};
