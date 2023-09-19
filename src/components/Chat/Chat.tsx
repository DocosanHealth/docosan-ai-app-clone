import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import Message from './Message';
import { MessageType, User } from './types';
import SystemMessage from '@/components/Chat/SystemMessage';

type Props = {
  messages: Array<MessageType>;
  selfInfo: User;
};

export default function Chat(props: Props) {
  const { messages, selfInfo } = props;
  const renderItem = ({ item }: { item: MessageType }) => {
    return <Message {...item} isSelf={selfInfo.id === item.user.id} />;
  };

  const renderSeparator = () => {
    return <View style={{ height: 8 }} />;
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        contentContainerStyle={styles.viewContentContainer}

      />

      <SystemMessage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    // paddingBottom: 60,
  },
});
