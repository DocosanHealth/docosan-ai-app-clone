import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { ButtonIcon } from '@/components';
import { faX } from '@fortawesome/pro-light-svg-icons';
import { Colors } from '@/theme';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { appStateUpdate } from '@/store/appState/AppStateRedux';

export type OptionItem = {
  title: string;
  onPress: () => void;
  image?: React.ReactNode;
};

export function ActionSheet() {
  const {
    visible = false,
    title = '',
    options,
  } = useSelector((state: RootState) => state.appState.actionSheet || {});
  // const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  const renderItem = ({ item }: { item: OptionItem }) => {
    return (
      <TouchableOpacity
        style={styles.btnItem}
        onPress={() => {
          !!item.onPress && item.onPress!();
          onClose();
        }}
      >
        {!!item.image && item.image}
        <Text style={styles.txtItem}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const onClose = () => {
    dispatch(
      appStateUpdate({
        actionSheet: {
          visible: false,
          title: '',
          options: [],
        },
      }),
    );
  };

  return (
    <Modal
      isVisible={visible}
      swipeDirection={'down'}
      useNativeDriverForBackdrop={true}
      coverScreen={true}
      hasBackdrop={true}
      backdropOpacity={0.5}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.container}
    >
      <View style={styles.viewContent}>
        <View style={styles.viewHeader}>
          <Text style={styles.txtTitle}>{title}</Text>

          <ButtonIcon
            onPress={onClose}
            icon={faX}
            iconSize={16}
            iconColor={Colors.black}
          />
        </View>
        <FlatList data={options} renderItem={renderItem} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  viewContent: {
    flex: 0,
    width: '100%',
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingBottom: 16,
    overflow: 'hidden',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  viewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Colors.gray,
    borderBottomWidth: 0.5,
    marginVertical: 8,
    paddingVertical: 8,
  },
  txtTitle: {
    flex: 1,
    textAlign: 'left',
    color: Colors.blue,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  btnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  txtItem: {
    flex: 1,
    textAlign: 'left',
    color: Colors.black,
    fontSize: 14,
    lineHeight: 20,
  },
});
