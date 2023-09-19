import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Chat, Header } from '@/components';
import { Colors } from '@/theme';
import { ChatInput } from '@/components/Chat/ChatInput';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { chatSendMessageAction } from '@/store/chat/ChatSaga';

export default function SChat() {
  const { messages = [] } = useSelector((state: RootState) => state.chat);
  const selfProfile = useSelector((state: RootState) => state.user.profile);
  const dispatch = useDispatch();

  const onSend = (messageContent: string) => {
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
      />

      <ChatInput onSend={onSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
