import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { ButtonIcon } from '@/components';
import { faSend } from '@fortawesome/pro-light-svg-icons';
import { Colors } from '@/theme';
import { useTranslation } from 'react-i18next';

type Props = {
  onSend: (content: string) => void;
};
export function ChatInput(props: Props) {
  const { onSend } = props;
  const [content, setContent] = useState('');
  const { t } = useTranslation(['chat']);

  const _onSend = () => {
    onSend(content);
    setContent('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={t('placeholder_chat_input')}
        placeholderTextColor={Colors.gray}
        style={styles.inputChat}
        multiline={false}
        value={content}
        onChangeText={text => setContent(text)}
        onSubmitEditing={_onSend}
      />

      <ButtonIcon
        onPress={_onSend}
        icon={faSend}
        style={styles.btnSend}
        iconColor={Colors.white}
        iconSize={18}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  inputChat: {
    flex: 1,
    // generate shadow for iOS
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // generate shadow for Android
    elevation: 2,
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 16,
    // paddingVertical: 8,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  btnSend: {
    marginLeft: 8,
    backgroundColor: Colors.turquoise,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
