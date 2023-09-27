import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import Message from './Message';
import { MessageType, User } from './types';
import SystemMessage from '@/components/Chat/SystemMessage';
import { LoadingMessage } from '@/components/Chat/LoadingMessage';

type Props = {
  messages: Array<MessageType>;
  selfInfo: User;
  isLoading: boolean;
};

export default function Chat(props: Props) {
  const { messages, selfInfo, isLoading = false } = props;
  const chatRef = React.useRef<FlatList>(null);

  const renderItem = ({ item }: { item: MessageType }) => {
    return <Message {...item} isSelf={selfInfo.id === item.user.id} />;
  };

  const renderSeparator = () => {
    return <View style={{ height: 8 }} />;
  };
  return (
    <View style={styles.container}>
      <FlatList
        ref={chatRef}
        keyExtractor={item => item.id.toString()}
        data={messages}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        ListFooterComponent={(isLoading && <LoadingMessage />) || null}
        ListFooterComponentStyle={styles.viewFooterComponent}
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
  viewFooterComponent: {
    marginVertical: 16,
  },
});
