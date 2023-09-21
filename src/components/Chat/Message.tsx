import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MessageType } from '@/components/Chat/types';
import { Colors } from '@/theme';
import { Typewriter } from '@/components/Text';
import { Avatar } from '@/components/Chat/Avatar';
import { useTheme } from '@/hooks';

export default function Message(props: MessageType) {
  const { content, isSelf } = props;
  const { Images } = useTheme();

  return (
    <View style={isSelf ? styles.containerRight : styles.containerLeft}>
      {!isSelf && <Avatar source={Images.mascot} />}

      <View style={isSelf ? styles.viewBubbleRight : styles.viewBubbleLeft}>
        {content && isSelf && (
          <Text style={styles.txtContentRight}>{content}</Text>
        )}

        {content && !isSelf && (
          <Typewriter
            style={styles.txtContentLeft}
            delay={200}
            text={content}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    maxWidth: '80%',
  },
  viewBubbleRight: {
    backgroundColor: Colors.blue,
    padding: 8,
    borderRadius: 8,
    maxWidth: '90%',
  },
  txtContentLeft: {
    color: Colors.black,
    fontSize: 14,
  },
  txtContentRight: {
    color: Colors.white,
    fontSize: 14,
  },
});
