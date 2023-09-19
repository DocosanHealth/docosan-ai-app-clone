import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MessageType } from '@/components/Chat/types';
import { Colors } from '@/theme';

export default function Message(props: MessageType) {
  const { content, isSelf } = props;

  return (
    <View style={isSelf ? styles.containerRight : styles.containerLeft}>
      <View style={isSelf ? styles.viewBubbleRight : styles.viewBubbleLeft}>
        {content && (
          <Text style={isSelf ? styles.txtContentLeft : styles.txtContentRight}>
            {content}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  containerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  viewBubbleLeft: {
    backgroundColor: '#F5F5F5',
    padding: 8,
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    maxWidth: '90%',
  },
  viewBubbleRight: {
    backgroundColor: Colors.blue,
    padding: 8,
    borderRadius: 8,
    maxWidth: '90%',
  },
  txtContentLeft: {
    color: Colors.white,
    fontSize: 14,
  },
  txtContentRight: {
    color: Colors.black,
    fontSize: 14,
  },
});
