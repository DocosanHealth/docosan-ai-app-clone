import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { Icon } from '@/components/Icon/Icon';
import { Colors } from '@/theme';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type Props = {
  label?: string;
  icon?: IconProp;
} & TextInputProps;
const Input = (props: Props) => {
  const { label, icon } = props;
  return (
    <View style={styles.container}>
      {!!label && <Text style={styles.txtLabel}>{label}</Text>}
      <View style={styles.viewInput}>
        {!!icon && <Icon icon={icon} size={16} color={Colors.black} />}
        <TextInput
          placeholderTextColor={Colors.gray}
          style={styles.inputGeneral}
          {...props}
        />
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
  },
  txtLabel: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: '#000',
    marginVertical: 4,
  },
  viewInput: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  inputGeneral: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
    color: '#000',
    marginLeft: 16,
  },
});
