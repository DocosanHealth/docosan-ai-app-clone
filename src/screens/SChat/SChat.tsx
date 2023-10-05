import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Chat, ChatHistoryModal, DisclaimerModal, Header } from "@/components";
import { Colors } from '@/theme';
import { ChatInput } from '@/components/Chat/ChatInput';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { chatSendMessageAction } from '@/store/chat/ChatSaga';
import { useTranslation } from 'react-i18next';
import { navigate } from '@/services';

export default function SChat() {
  const { messages = [], isLoading, lastUpdatedAt } = useSelector(
    (state: RootState) => state.chat,
  );
  const selfProfile = useSelector(
    (state: RootState) => state.user.profile || {},
  );
  const isLogged: boolean = useSelector(
    (state: RootState) => !!state.user.token,
  );
  const { t } = useTranslation(['chat']);
  const dispatch = useDispatch();

  const onSend = (messageContent: string) => {
    if (!messageContent) {
      return;
    }

    if (
      !isLogged &&
      messages.filter(item => Number(item.user.id) === 0).length >= 5
    ) {
      return Alert.alert(
        t('alert_title_over_limit'),
        t('alert_message_over_limit', { count: 5 }),
        [
          {
            text: t('btn_ok'),
            onPress: () => {
              navigate('SLogin');
            },
          },
        ],
      );
    }
    dispatch(chatSendMessageAction(messageContent));
  };

  return (
    <View style={styles.container}>
      <Header />

      <Chat
        messages={messages}
        selfInfo={{
          id: (selfProfile?.id || 0).toString(),
          name: selfProfile?.name || '',
          avatar: selfProfile?.avatar || '',
        }}
        isLoading={isLoading}
        lastUpdatedAt={lastUpdatedAt}
      />

      <ChatInput onSend={onSend} />

      <DisclaimerModal />

      <ChatHistoryModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
