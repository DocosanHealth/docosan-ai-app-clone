import React, { Dispatch, SetStateAction, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Colors } from '@/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSquareCheck, faSquare } from '@fortawesome/free-regular-svg-icons';
export default (props: {
  isChecked: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => props.setIsChecked(!props.isChecked)}
    >
      <FontAwesomeIcon
        icon={props.isChecked ? faSquareCheck : faSquare}
        size={24}
        color={Colors.turquoise}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 24,
    height: 24,
  },
});
