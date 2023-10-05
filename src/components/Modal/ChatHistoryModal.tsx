import Modal from 'react-native-modal';
import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '@/theme';
import { useTranslation } from 'react-i18next';
import { appStateUpdate } from '@/store/appState/AppStateRedux';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ButtonIcon } from '@/components';
import { faX } from '@fortawesome/pro-light-svg-icons';
import moment from 'moment';
import {
  chatReset,
  chatShowModalHistory,
  chatUpdateConversationId,
  chatUpdateMessages,
} from '@/store/chat/ChatRedux';

const ChatHistoryModal = () => {
  const isVisible = useSelector(
    (state: RootState) => state.chat.isShowModalHistory || false,
  );
  const histories = useSelector(
    (state: RootState) => state.chat.histories || [],
  );
  const userProfile = useSelector(
    (state: RootState) => state.user.profile || {},
  );
  const dispatch = useDispatch();
  const { t } = useTranslation(['chat']);

  const _onClose = () => {
    dispatch(chatShowModalHistory(false));
  };

  const _onSelectHistory = (item: any) => {
    _onClose();
    dispatch(chatReset());
    dispatch(chatUpdateConversationId(item.id));
    const _messages = [];
    for (const message of item.messages) {
      _messages.push({
        // id: moment().unix(),
        content: message.content,
        type: 'text',
        user: {
          id: message.role === 'user' ? userProfile?.id?.toString() || '0' : -1,
          name: message.role === 'user' ? userProfile.name : '',
          avatar: message.role === 'user' ? userProfile.avatar : null,
        },
      });
    }
    dispatch(chatUpdateMessages(_messages));
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={_onClose}
      style={styles.container}
    >
      <View style={styles.viewContent}>
        <View style={styles.viewHeader}>
          <Text style={styles.txtTitle}>{t('chat:modal_title_history')}</Text>

          <ButtonIcon
            onPress={_onClose}
            icon={faX}
            iconSize={16}
            iconColor={Colors.black}
          />
        </View>
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={histories}
          renderItem={({ item }) => {
            const lastMessage =
              item.messages[item.messages.length - 1]?.content ?? '';

            return (
              <TouchableOpacity
                style={styles.btnItem}
                onPress={() => _onSelectHistory(item)}
              >
                <Text style={styles.txtItemTitle} numberOfLines={1}>
                  {lastMessage}
                </Text>
                <Text style={styles.txtItemDescription}>
                  {moment(item.createdAt).format('HH:mm DD/MM/YYYY')}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </Modal>
  );
};

export default ChatHistoryModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  viewContent: {
    flex: 0,
    width: '100%',
    height: '80%',
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
    paddingVertical: 8,
  },
  txtItemTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  txtItemDescription: {
    fontSize: 12,
    fontWeight: '300',
    color: Colors.black,
  },
});
